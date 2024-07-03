import { Id } from './_generated/dataModel';
import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import {
    getAll,
    getOneFrom,
    getManyFrom,
    getManyVia,
} from 'convex-helpers/server/relationships';
import { asyncMap } from 'convex-helpers';

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

export const getApplicantById = query({
    args: { userId: v.id('users') },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        const applicant = await getOneFrom(
            ctx.db,
            'applicants',
            'byUserId',
            args.userId,
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
        const identity = await ctx.auth.getUserIdentity();

        if (identity === null) {
            throw new Error('Unauthenticated call to mutation');
        }

        const user = await ctx.db.get(identity?.subject as Id<'users'>);

        if (user?.role !== 'user') {
            return {
                success: false,
                message: 'You must be a user',
            };
        }

        const applicantId = await ctx.db.insert('applicants', {
            userId: user._id,
            education: args.education,
            skills: args.skills,
            fileId: args.fileId,
            rating: 0,
        });

        if (applicantId === null) {
            return { success: false, message: 'Error try again' };
        }

        await ctx.db.patch(user._id, { role: 'applicant' });

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
        const identity = await ctx.auth.getUserIdentity();

        if (identity === null) {
            throw new Error('Unauthenticated call to mutation');
        }

        const applicant = await ctx.db
            .query('applicants')
            .withIndex('byUserId', (q) =>
                q.eq('userId', identity.subject as Id<'users'>)
            )
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
        const identity = await ctx.auth.getUserIdentity();

        if (identity === null) {
            throw new Error('Unauthenticated call to mutation');
        }

        const applicant = await ctx.db
            .query('applicants')
            .withIndex('byUserId', (q) =>
                q.eq('userId', identity.subject as Id<'users'>)
            )
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
        const identity = await ctx.auth.getUserIdentity();

        if (identity === null) {
            throw new Error('Unauthenticated call to mutation');
        }

        const user = await ctx.db.get(identity?.subject as Id<'users'>);

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
        const identity = await ctx.auth.getUserIdentity();

        if (identity === null) {
            throw new Error('Unauthenticated call to mutation');
        }

        const user = await ctx.db.get(identity.subject as Id<'users'>);

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

        const account = await getOneFrom(
            ctx.db,
            'accounts',
            'userId',
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

        await ctx.db.delete(args.applicantId);

        await ctx.db.delete(applicant?._id!);

        await ctx.db.delete(account?._id!);

        await ctx.storage.delete(applicant?.fileId!);

        // emailer.notifyUserForDeletedAccount(user?.email, user?.name);

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
