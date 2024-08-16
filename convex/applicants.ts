import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { getOneFrom, getManyFrom } from 'convex-helpers/server/relationships';
import { asyncMap } from 'convex-helpers';
import { auth } from './auth';
import { api, internal } from './_generated/api';

export const getAllApplicants = query({
    args: {},
    handler: async (ctx) => {
        const applicants = await ctx.db
            .query('applicants')
            .order('desc')
            .collect();

        return applicants;
    },
});

export const getApplicant = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);

        if (userId === null) return;

        const user = await ctx.db.get(userId);

        const applicant = await getOneFrom(
            ctx.db,
            'applicants',
            'byUserId',
            userId,
            'userId'
        );

        const fileUrl = await ctx.storage.getUrl(applicant?.fileId!);

        return { ...user, ...applicant, fileUrl };
    },
});

export const getApplicantOnlyById = query({
    args: { userId: v.id('users') },
    handler: async (ctx, args) => {
        const applicant = await getOneFrom(
            ctx.db,
            'applicants',
            'byUserId',
            args.userId,
            'userId'
        );

        return applicant;
    },
});

export const updateUserId = mutation({
    args: { userId: v.id('users'), applicantId: v.id('applicants') },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.applicantId, {
            userId: args.userId,
        });
    },
});

export const createApplicant = mutation({
    args: {
        education: v.array(
            v.object({
                institutionName: v.string(),
                startYear: v.string(),
                endYear: v.string(),
            })
        ),
        skills: v.array(
            v.object({
                text: v.string(),
                id: v.string(),
            })
        ),
        fileId: v.id('_storage'),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);

        if (user?.role !== 'user') {
            return {
                success: false,
                message: 'You must be a user',
            };
        }

        const applicantId = await ctx.db.insert('applicants', {
            userId: userId,
            education: args.education,
            skills: args.skills,
            fileId: args.fileId,
            rating: 0,
        });

        if (applicantId === null) {
            return { success: false, message: 'Error try again' };
        }

        await ctx.scheduler.runAfter(0, api.email.newUserEmail, {
            email: user?.email!,
            name: user?.name!,
        });

        await ctx.db.patch(userId, { role: 'applicant' });

        return {
            success: true,
            message: 'Applicant account created successfully',
        };
    },
});

export const updateCV = mutation({
    args: {
        fileId: v.id('_storage'),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const applicant = await ctx.db
            .query('applicants')
            .withIndex('byUserId', (q) => q.eq('userId', userId))
            .unique();

        if (!applicant?.fileId) return;

        await ctx.db.patch(applicant?._id!, {
            fileId: args.fileId,
            updatedAt: Date.now(),
        });

        await ctx.storage.delete(applicant?.fileId);

        if (applicant === null) {
            return { success: false, message: 'Error try again' };
        }

        return { success: true, message: 'File Updated successfully' };
    },
});

export const addFileId = mutation({
    args: {
        fileId: v.id('_storage'),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const applicant = await ctx.db
            .query('applicants')
            .withIndex('byUserId', (q) => q.eq('userId', userId))
            .unique();

        if (!applicant) {
            return { success: false, message: 'Error try again' };
        }

        await ctx.db.patch(applicant?._id!, {
            fileId: args.fileId,
            updatedAt: Date.now(),
        });

        return { success: true, message: 'File Updated successfully' };
    },
});

export const updateApplicant = mutation({
    args: {
        applicantId: v.id('applicants'),
        education: v.array(
            v.object({
                institutionName: v.string(),
                startYear: v.string(),
                endYear: v.string(),
            })
        ),
        skills: v.array(
            v.object({
                text: v.string(),
                id: v.string(),
            })
        ),
    },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);

        if (user?.role !== 'applicant') {
            return { success: false, message: 'You must be an applicant' };
        }

        await ctx.db.patch(args.applicantId, {
            education: args.education,
            skills: args.skills,
            updatedAt: Date.now(),
        });

        return {
            success: true,
            message: `Applicant ${user.name} updated successfully`,
        };
    },
});

export const deleteApplicant = mutation({
    args: { applicantId: v.id('users') },
    handler: async (ctx, args) => {
        const userId = await auth.getUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);

        if (user?.role !== 'applicant') {
            return {
                success: false,
                message: 'You have no permissions to delete a applicant',
            };
        }

        const applicant = await getOneFrom(
            ctx.db,
            'applicants',
            'byUserId',
            user?._id,
            'userId'
        );

        // Check any active application
        const acceptedApplications = await ctx.db
            .query('applications')
            .withIndex('byApplicantId', (q) => q.eq('applicantId', user?._id!))
            .filter((q) => q.eq(q.field('status'), 'accepted'))
            .collect();

        if (acceptedApplications.length > 0) {
            return {
                success: false,
                message: `${user.name} you can't delete your account now because your job is still on going.`,
            };
        }

        const myApplications = await getManyFrom(
            ctx.db,
            'applications',
            'byApplicantId',
            args.applicantId,
            'applicantId'
        );

        const myRatings = await ctx.db
            .query('ratings')
            .withIndex('by_Applicant_Category', (q) =>
                q.eq('applicantId', args.applicantId)
            )
            .filter((q) => q.eq(q.field('category'), 'applicant'))
            .collect();

        const sessionToDelete = await getOneFrom(
            ctx.db,
            'authSessions',
            'userId',
            user?._id,
            'userId'
        );
        const accountToDelete = await ctx.db
            .query('authAccounts')
            .filter((q) => q.eq(q.field('userId'), user._id))
            .unique();

        const refreshToDelete = await getOneFrom(
            ctx.db,
            'authRefreshTokens',
            'sessionId',
            sessionToDelete?._id!,
            'sessionId'
        );
        const verficationToDelete = await getOneFrom(
            ctx.db,
            'authVerificationCodes',
            'accountId',
            accountToDelete?._id!,
            'accountId'
        );
        const verifierToDelete = await ctx.db
            .query('authVerifiers')
            .filter((q) => q.eq(q.field('sessionId'), sessionToDelete?._id))
            .unique();
        const rateLimitToDelete = await ctx.db
            .query('authRateLimits')
            .filter((q) => q.eq(q.field('identifier'), user._id))
            .unique();

        const authTableArray = [
            user,
            sessionToDelete,
            accountToDelete,
            refreshToDelete,
            verficationToDelete,
            verifierToDelete,
            rateLimitToDelete,
        ];

        await ctx.scheduler.runAfter(0, api.email.deleteUserEmail, {
            email: user?.email!,
            name: user?.name!,
        });

        await asyncMap(authTableArray, async (authTable) => {
            if (authTable !== null) {
                return await ctx.db.delete(authTable?._id!);
            }
        });

        await ctx.db.delete(applicant?._id!);

        await ctx.storage.delete(applicant?.fileId!);

        // delete all applicant applications
        await asyncMap(myApplications, async (myApplication) => {
            return await ctx.db.delete(myApplication._id);
        });

        // delete all applicant attributed ratings
        await asyncMap(myRatings, async (myRating) => {
            return await ctx.db.delete(myRating._id);
        });

        return {
            success: true,
            message: `Applicant '${user.name}' deleted successfully`,
        };
    },
});
