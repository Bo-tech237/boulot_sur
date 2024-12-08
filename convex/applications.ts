import { Id } from './_generated/dataModel';
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { getOneFrom } from 'convex-helpers/server/relationships';
import { asyncMap } from 'convex-helpers';
import { getAuthUserId } from '@convex-dev/auth/server';
import { hasPermission } from './lib/permissions';

const ApplicationStatuses = {
    APPLIED: 'applied' as const,
    ACCEPTED: 'accepted' as const,
    REJECTED: 'rejected' as const,
    SHORTLISTED: 'shortlisted' as const,
    DELETED: 'deleted' as const,
    CANCELLED: 'cancelled' as const,
    FINISHED: 'finished' as const,
};

export const getAllApplictions = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const applications = await ctx.db
            .query('applications')
            .filter((q) =>
                q.or(
                    q.eq(q.field('applicantId'), userId),
                    q.eq(q.field('recruiterId'), userId)
                )
            )
            .order('desc')
            .collect();

        const data = await asyncMap(applications, async (application) => {
            const job = await ctx.db.get(application.jobId);
            const userA = await ctx.db.get(application.applicantId);
            const userR = await ctx.db.get(job?.userId!);
            const applicantResult = await getOneFrom(
                ctx.db,
                'applicants',
                'byUserId',
                application.applicantId,
                'userId'
            );

            const fileUrl = await ctx.storage.getUrl(applicantResult?.fileId!);

            const recruiterResult = await getOneFrom(
                ctx.db,
                'recruiters',
                'byUserId',
                job?.userId!,
                'userId'
            );

            const applicant = { ...userA, ...applicantResult, fileUrl };
            const recruiter = { ...userR, ...recruiterResult };

            return { ...application, applicant, recruiter, job };
        });

        return data;
    },
});

export const createApplication = mutation({
    args: { sop: v.string(), jobId: v.id('jobs') },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) {
            return {
                success: false,
                message: 'You have to sign in before applying for this job',
            };
        }

        const user = await ctx.db.get(userId);

        if (!user || !hasPermission(user, 'applications', 'create')) {
            return { success: false, message: 'You must be an applicant' };
        }

        // check whether applied previously
        // find job
        // check count of active applications < limit
        // check user had < 10 active applications && check if user is not having any accepted jobs (user id)
        // store the data in applications
        const application = await ctx.db
            .query('applications')
            .withIndex('by_ApplicantId_JobId', (q) =>
                q.eq('applicantId', user._id).eq('jobId', args.jobId)
            )
            .first();

        if (
            application &&
            (application.status === ApplicationStatuses.APPLIED ||
                application.status === ApplicationStatuses.SHORTLISTED)
        ) {
            return {
                success: false,
                message: 'You have already applied for this job',
            };
        }

        const foundJob = await ctx.db.get(args.jobId);

        if (!foundJob) {
            return { success: false, message: 'No job found' };
        }

        const acceptedApplications = await ctx.db
            .query('applications')
            .withIndex('byJobId_Status', (q) =>
                q
                    .eq('jobId', args.jobId)
                    .eq('status', ApplicationStatuses.ACCEPTED)
            )
            .collect()
            .then((applications) => applications.length);

        if (acceptedApplications >= foundJob.maxApplicants) {
            return { success: false, message: 'Application limit reached' };
        }

        const myActiveApplicationsCount = await ctx.db
            .query('applications')
            .withIndex('byApplicantId', (q) => q.eq('applicantId', user._id))
            .filter((q) =>
                q.or(
                    q.eq(q.field('status'), ApplicationStatuses.ACCEPTED),
                    q.eq(q.field('status'), ApplicationStatuses.APPLIED),
                    q.eq(q.field('status'), ApplicationStatuses.SHORTLISTED)
                )
            )
            .collect()
            .then((applications) => applications.length);

        if (myActiveApplicationsCount >= 10) {
            return {
                success: false,
                message:
                    'You have 10 active applications. Hence you cannot apply.',
            };
        }

        const acceptedJobsCount = await ctx.db
            .query('applications')
            .withIndex('byApplicantId_Status', (q) =>
                q
                    .eq('applicantId', user._id)
                    .eq('status', ApplicationStatuses.ACCEPTED)
            )
            .collect()
            .then((applications) => applications.length);

        if (acceptedJobsCount > 0) {
            return {
                success: false,
                message:
                    'You already have an accepted job. Hence you cannot apply.',
            };
        }

        const newApplicationId = await ctx.db.insert('applications', {
            applicantId: user._id,
            recruiterId: foundJob.userId,
            jobId: foundJob._id,
            status: ApplicationStatuses.APPLIED,
            sop: args.sop,
        });

        if (!newApplicationId) {
            return { success: false, message: 'Error try again' };
        }

        await ctx.db.patch(foundJob._id, {
            activeApplications: acceptedApplications + 1,
            updatedAt: Date.now(),
        });

        return { success: true, message: 'Job applied successfully' };
    },
});

export const updateApplication = mutation({
    args: {
        applicationId: v.id('applications'),
        status: v.union(
            v.literal('applied'),
            v.literal('shortlisted'),
            v.literal('accepted'),
            v.literal('rejected'),
            v.literal('deleted'),
            v.literal('cancelled'),
            v.literal('finished')
        ),
    },

    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);

        if (!user || !hasPermission(user, 'applications', 'update')) {
            return {
                success: false,
                message: 'You do not have permission to update applications',
            };
        }

        const application = await ctx.db.get(args.applicationId);
        if (!application) {
            return {
                success: false,
                message: 'Application not found',
            };
        }
        const job = await ctx.db.get(application?.jobId);
        if (!job) {
            return {
                success: false,
                message: 'Job does not exist',
            };
        }

        if (user.roles?.includes('recruiter')) {
            if (
                args.status === ApplicationStatuses.ACCEPTED &&
                (application.status === ApplicationStatuses.APPLIED ||
                    application.status === ApplicationStatuses.SHORTLISTED)
            ) {
                const acceptedApplicationCount = await ctx.db
                    .query('applications')
                    .withIndex('by_RecruiterId_JobId_Status', (q) =>
                        q
                            .eq('recruiterId', user._id)
                            .eq('jobId', job._id)
                            .eq('status', ApplicationStatuses.ACCEPTED)
                    )
                    .collect()
                    .then((acceptedApplication) => acceptedApplication.length);

                if (acceptedApplicationCount >= job.maxPositions) {
                    return {
                        success: false,
                        message:
                            'All positions for this job are already filled',
                    };
                }

                await ctx.db.patch(args.applicationId, {
                    status: args.status,
                    updatedAt: Date.now(),
                });
                // Cancel other pending applications for the same applicant
                const applicantStatus = await ctx.db
                    .query('applications')
                    .withIndex('byApplicantId', (q) =>
                        q.eq('applicantId', application.applicantId)
                    )
                    .filter((q) =>
                        q.and(
                            q.neq(q.field('_id'), args.applicationId),
                            q.or(
                                q.eq(
                                    q.field('status'),
                                    ApplicationStatuses.APPLIED
                                ),
                                q.eq(
                                    q.field('status'),
                                    ApplicationStatuses.SHORTLISTED
                                )
                            )
                        )
                    )
                    .collect();

                await asyncMap(applicantStatus, (app) =>
                    ctx.db.patch(app._id, {
                        status: ApplicationStatuses.CANCELLED,
                        updatedAt: Date.now(),
                    })
                );
                await ctx.db.patch(job._id, {
                    acceptedApplicants: acceptedApplicationCount + 1,
                    updatedAt: Date.now(),
                });

                return {
                    success: true,
                    message: `Application ${args.status} successfully`,
                };
            } else if (
                args.status === 'rejected' &&
                (application.status === 'applied' ||
                    application.status === 'shortlisted')
            ) {
                await ctx.db.patch(args.applicationId, {
                    status: args.status,
                    updatedAt: Date.now(),
                });
                return {
                    success: true,
                    message: `Application ${args.status} successfully`,
                };
            } else if (
                args.status === 'finished' &&
                application.status === 'accepted'
            ) {
                await ctx.db.patch(args.applicationId, {
                    status: args.status,
                    updatedAt: Date.now(),
                });
                return {
                    success: true,
                    message: `Application ${args.status} successfully`,
                };
            } else if (
                args.status === 'shortlisted' &&
                application.status === 'applied'
            ) {
                await ctx.db.patch(args.applicationId, {
                    status: args.status,
                    updatedAt: Date.now(),
                });
                return {
                    success: true,
                    message: `Application ${args.status} successfully`,
                };
            } else {
                return {
                    success: false,
                    message: `This application has already been ${application.status}.`,
                };
            }
        }

        if (user.roles?.includes('applicant')) {
            if (
                args.status === ApplicationStatuses.CANCELLED &&
                (application.status === ApplicationStatuses.APPLIED ||
                    application.status === ApplicationStatuses.SHORTLISTED)
            ) {
                await ctx.db.patch(args.applicationId, {
                    status: args.status,
                    updatedAt: Date.now(),
                });
                return {
                    success: true,
                    message: `Application ${args.status} successfully`,
                };
            }
            return {
                success: false,
                message: `This application has already been ${application.status}.`,
            };
        }
    },
});

export const deleteApplication = mutation({
    args: { applicationId: v.id('applications') },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);

        if (!user || !hasPermission(user, 'applications', 'delete')) {
            return {
                success: false,
                message: 'You have no permissions to delete applications',
            };
        }

        const application = await ctx.db.get(args.applicationId);

        if (!application) {
            return {
                success: false,
                message: 'Application not found',
            };
        }

        if (
            application.status === ApplicationStatuses.FINISHED ||
            application.status === ApplicationStatuses.REJECTED ||
            application.status === ApplicationStatuses.CANCELLED ||
            application.status === ApplicationStatuses.DELETED
        ) {
            await ctx.db.delete(args.applicationId);

            return {
                success: true,
                message: 'Application deleted successfully',
            };
        }

        return {
            success: false,
            message: 'This application is still active!',
        };
    },
});
