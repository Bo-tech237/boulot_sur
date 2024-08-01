import { Id } from './_generated/dataModel';
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { getOneFrom } from 'convex-helpers/server/relationships';
import { asyncMap } from 'convex-helpers';
import { auth } from './auth';

export const getAllApplictions = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);

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
        const userId = await auth.getUserId(ctx);

        if (userId === null) {
            return {
                success: false,
                message: 'You have to sign in before applying for this job',
            };
        }

        const user = await ctx.db.get(userId);

        if (user?.role !== 'applicant') {
            return { success: false, message: 'You must be an applicant' };
        }

        // check whether applied previously
        // find job
        // check count of active applications < limit
        // check user had < 10 active applications && check if user is not having any accepted jobs (user id)
        // store the data in applications
        const appliedApplication = await ctx.db
            .query('applications')
            .withIndex('by_ApplicantId_JobId', (q) =>
                q.eq('applicantId', user._id).eq('jobId', args.jobId)
            )
            .filter((q) =>
                q.or(
                    q.neq(q.field('status'), 'accepted'),
                    q.neq(q.field('status'), 'deleted'),
                    q.neq(q.field('status'), 'cancelled')
                )
            )
            .first();

        if (appliedApplication) {
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
            .withIndex('byJobId', (q) => q.eq('jobId', args.jobId))
            .filter((q) =>
                q.or(
                    q.neq(q.field('status'), 'rejected'),
                    q.neq(q.field('status'), 'deleted'),
                    q.neq(q.field('status'), 'cancelled'),
                    q.neq(q.field('status'), 'finished')
                )
            )
            .collect();

        const acceptedApplicationCount = acceptedApplications.length;

        if (acceptedApplicationCount < foundJob.maxApplicants) {
            const myActiveApplications = await ctx.db
                .query('applications')
                .withIndex('byApplicantId', (q) =>
                    q.eq('applicantId', user._id)
                )
                .filter((q) =>
                    q.or(
                        q.neq(q.field('status'), 'rejected'),
                        q.neq(q.field('status'), 'deleted'),
                        q.neq(q.field('status'), 'cancelled'),
                        q.neq(q.field('status'), 'finished')
                    )
                )
                .collect();

            const myActiveApplicationCount = myActiveApplications.length;

            if (myActiveApplicationCount < 10) {
                const acceptedJobs = await ctx.db
                    .query('applications')
                    .withIndex('byApplicantId', (q) =>
                        q.eq('applicantId', user._id)
                    )
                    .filter((q) => q.eq(q.field('status'), 'accepted'))
                    .collect();

                const acceptedJobCount = acceptedJobs.length;

                if (acceptedJobCount === 0) {
                    const newApplication = await ctx.db.insert('applications', {
                        applicantId: user._id,
                        recruiterId: foundJob.userId,
                        jobId: foundJob._id,
                        status: 'applied',
                        sop: args.sop,
                    });

                    if (newApplication) {
                        await ctx.db.patch(foundJob._id, {
                            activeApplications: acceptedApplicationCount + 1,
                            updatedAt: Date.now(),
                        });

                        return {
                            success: true,
                            message: 'Job applied successfully',
                        };
                    } else {
                        return {
                            success: false,
                            message: 'Invalid data received',
                        };
                    }
                } else {
                    return {
                        success: false,
                        message:
                            'You already have an accepted job. Hence you cannot apply.',
                    };
                }
            } else {
                return {
                    success: false,
                    message:
                        'You have 10 active applications. Hence you cannot apply.',
                };
            }
        } else {
            return { success: false, message: 'Application limit reached' };
        }
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
        const userId = await auth.getUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);

        if (user?.role === 'recruiter') {
            const application = await ctx.db.get(args.applicationId);

            if (!application) {
                return {
                    success: false,
                    message: 'Application not found',
                };
            }

            const job = await ctx.db.get(application.jobId);

            if (!job) {
                return {
                    success: false,
                    message: 'Job does not exist',
                };
            }

            if (args.status === 'accepted') {
                // get job id from application
                // get job info for maxPositions count
                // count applications that are already accepted
                // compare and if condition is satisfied, then save

                const acceptedApplication = await ctx.db
                    .query('applications')
                    .withIndex('by_ApplicantId_RecruiterId_JobId', (q) =>
                        q
                            .eq('applicantId', application.applicantId)
                            .eq('recruiterId', user._id)
                            .eq('jobId', job._id)
                    )
                    .filter((q) =>
                        q.or(
                            q.eq(q.field('status'), 'accepted'),
                            q.eq(q.field('status'), 'finished'),
                            q.eq(q.field('status'), 'rejected'),
                            q.eq(q.field('status'), 'cancelled')
                        )
                    )
                    .first();

                console.log('testAccepted', application);

                if (acceptedApplication) {
                    return {
                        success: false,
                        message: 'This application has already been accepted.',
                    };
                }

                const acceptedApplications = await ctx.db
                    .query('applications')
                    .withIndex('by_RecruiterId_JobId', (q) =>
                        q.eq('recruiterId', user._id).eq('jobId', job._id)
                    )
                    .filter((q) => q.eq(q.field('status'), 'accepted'))
                    .collect();

                const acceptedApplicationCount = acceptedApplications.length;

                if (acceptedApplicationCount < job.maxPositions) {
                    // accepted
                    await ctx.db.patch(application._id, {
                        status: args.status,
                        updatedAt: Date.now(),
                    });

                    // update many
                    const applicantStatus = await ctx.db
                        .query('applications')
                        .withIndex('byApplicantId', (q) =>
                            q.eq('applicantId', application.applicantId)
                        )
                        .filter((q) =>
                            q.and(
                                q.neq(q.field('_id'), application._id),
                                q.or(
                                    q.eq(q.field('status'), 'applied'),
                                    q.eq(q.field('status'), 'shortlisted')
                                )
                            )
                        )
                        .collect();

                    const updatedApplicantStatus = await asyncMap(
                        applicantStatus,
                        async (application) => {
                            await ctx.db.patch(application._id, {
                                status: 'cancelled',
                                updatedAt: Date.now(),
                            });

                            return { ...application };
                        }
                    );

                    if (updatedApplicantStatus) {
                        await ctx.db.patch(job._id, {
                            acceptedApplicants: acceptedApplicationCount + 1,
                            updatedAt: Date.now(),
                        });

                        return {
                            success: true,
                            message: `Application ${args.status} successfully`,
                        };
                    }
                } else {
                    return {
                        success: false,
                        message:
                            'All positions for this job are already filled',
                    };
                }
            } else {
                if (args.status === 'finished') {
                    // change cancelled to applied will be done here...

                    const application = await ctx.db
                        .query('applications')
                        .withIndex('byRecruiterId', (q) =>
                            q.eq('recruiterId', user._id)
                        )
                        .filter((q) =>
                            q.and(
                                q.eq(q.field('_id'), args.applicationId),
                                q.eq(q.field('status'), 'accepted')
                            )
                        )
                        .unique();

                    console.log('testFinished', application);

                    if (!application) {
                        return {
                            success: false,
                            message: 'Application status can not be updated',
                        };
                    }

                    await ctx.db.patch(args.applicationId, {
                        status: args.status,
                        updatedAt: Date.now(),
                    });

                    return {
                        success: true,
                        message: `Job ${args.status} successfully`,
                    };
                } else if (args.status === 'shortlisted') {
                    const application = await ctx.db
                        .query('applications')
                        .withIndex('byRecruiterId', (q) =>
                            q.eq('recruiterId', user._id)
                        )
                        .filter((q) =>
                            q.and(
                                q.eq(q.field('_id'), args.applicationId),
                                q.eq(q.field('status'), 'applied')
                            )
                        )
                        .unique();

                    console.log('testShortlisted', application);

                    if (!application) {
                        return {
                            success: false,
                            message: 'Application status can not be updated',
                        };
                    }

                    await ctx.db.patch(args.applicationId, {
                        status: args.status,
                        updatedAt: Date.now(),
                    });

                    return {
                        success: true,
                        message: `Application ${args.status} successfully`,
                    };
                } else {
                    const application = await ctx.db
                        .query('applications')
                        .withIndex('byRecruiterId', (q) =>
                            q.eq('recruiterId', user._id)
                        )
                        .filter((q) =>
                            q.and(
                                q.eq(q.field('_id'), args.applicationId),
                                q.or(
                                    q.eq(q.field('status'), 'applied'),
                                    q.eq(q.field('status'), 'shortlisted')
                                )
                            )
                        )
                        .unique();

                    console.log('testElse', application);

                    if (!application) {
                        return {
                            success: false,
                            message: 'Application status can not be updated',
                        };
                    }

                    await ctx.db.patch(args.applicationId, {
                        status: args.status,
                        updatedAt: Date.now(),
                    });

                    return {
                        success: true,
                        message: `Application ${args.status} successfully`,
                    };
                }
            }
        } else {
            //Applicant can cancel

            const application = await ctx.db
                .query('applications')
                .withIndex('byApplicantId', (q) =>
                    q.eq('applicantId', user?._id!)
                )
                .filter((q) =>
                    q.and(
                        q.eq(q.field('_id'), args.applicationId),
                        q.or(
                            q.eq(q.field('status'), 'shortlisted'),
                            q.eq(q.field('status'), 'applied')
                        )
                    )
                )
                .unique();

            if (!application) {
                return {
                    success: false,
                    message: 'Application status can not be cancelled',
                };
            }

            await ctx.db.patch(args.applicationId, {
                status: args.status,
                updatedAt: Date.now(),
            });

            return {
                success: true,
                message: `Application ${args.status} successfully`,
            };
        }
    },
});

export const deleteApplication = mutation({
    args: { applicationId: v.id('applications') },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);

        if (user?.role !== 'applicant') {
            return {
                success: false,
                message: 'You have no permissions to delete applications',
            };
        }

        const application = await ctx.db
            .query('applications')
            .withIndex('byApplicantId', (q) => q.eq('applicantId', user?._id!))
            .filter((q) =>
                q.and(
                    q.eq(q.field('_id'), args.applicationId),
                    q.or(
                        q.eq(q.field('status'), 'finished'),
                        q.eq(q.field('status'), 'rejected'),
                        q.eq(q.field('status'), 'cancelled')
                    )
                )
            )
            .first();

        if (!application) {
            return {
                success: false,
                message: 'This application is still active!',
            };
        }

        await ctx.db.delete(args.applicationId);

        return {
            success: true,
            message: 'Application deleted successfully',
        };
    },
});
