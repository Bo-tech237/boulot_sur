import { query, mutation } from './_generated/server';
import { v } from 'convex/values';
import { asyncMap } from 'convex-helpers';
import { getAuthUserId } from '@convex-dev/auth/server';
import { hasPermission } from './lib/permissions';

export const getBestReviews = query({
    args: {},
    handler: async (ctx, args) => {
        const comments = await ctx.db.query('comments').order('desc').take(5);

        const reviews = await asyncMap(comments, async (comment) => {
            const user = await ctx.db.get(comment.userId);

            const rating = await ctx.db
                .query('ratings')
                .withIndex('byJobId', (q) => q.eq('jobId', comment.jobId))
                .filter((q) => q.gte(q.field('ratings'), 3))
                .first();

            return { rating, comment, user };
        });

        return reviews;
    },
});

export const getRecruiterReviews = query({
    args: { userId: v.id('users') },
    handler: async (ctx, args) => {
        const ratings = await ctx.db
            .query('ratings')
            .withIndex('by_RecruiterId_Category', (q) =>
                q.eq('recruiterId', args.userId).eq('category', 'job')
            )
            .order('desc')
            .take(5);

        const recruiter = await ctx.db
            .query('recruiters')
            .withIndex('byUserId', (q) => q.eq('userId', args.userId))
            .unique();

        const reviews = await asyncMap(ratings, async (rating) => {
            const user = await ctx.db.get(rating.applicantId);

            const comment = await ctx.db
                .query('comments')
                .withIndex('byUserId', (q) =>
                    q.eq('userId', rating.applicantId)
                )
                .first();

            return { rating, comment, user };
        });

        return { reviews, recruiter };
    },
});

export const getApplicantReviews = query({
    args: { userId: v.id('users') },
    handler: async (ctx, args) => {
        const ratings = await ctx.db
            .query('ratings')
            .withIndex('by_Applicant_Category', (q) =>
                q.eq('applicantId', args.userId).eq('category', 'applicant')
            )
            .order('desc')
            .take(5);

        const applicant = await ctx.db
            .query('applicants')
            .withIndex('byUserId', (q) => q.eq('userId', args.userId))
            .unique();

        if (!applicant || !applicant.fileId || !ratings) return;

        const fileUrl = await ctx.storage.getUrl(applicant?.fileId);

        const reviews = await asyncMap(ratings, async (rating) => {
            const user = await ctx.db.get(rating.recruiterId);

            const comment = await ctx.db
                .query('comments')
                .withIndex('byUserId', (q) =>
                    q.eq('userId', rating.recruiterId)
                )
                .first();

            return { rating, comment, user };
        });

        const applicantWithFileUrl = { ...applicant, fileUrl };

        return { reviews, applicantWithFileUrl };
    },
});

export const getCommentByUserId = query({
    args: { userId: v.id('users'), jobId: v.id('jobs') },
    handler: async (ctx, args) => {
        const comment = await ctx.db
            .query('comments')
            .withIndex('by_UserId_JobId', (q) =>
                q.eq('userId', args.userId).eq('jobId', args.jobId)
            )
            .first();

        return comment;
    },
});

export const createComment = mutation({
    args: { userId: v.id('users'), jobId: v.id('jobs'), text: v.string() },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);

        if (!user || !hasPermission(user, 'comments', 'create')) {
            return {
                success: false,
                message: 'Insufficient permissions for this action',
            };
        }

        const newComment = await ctx.db.insert('comments', {
            userId: args.userId,
            jobId: args.jobId,
            text: args.text,
        });

        if (!newComment) {
            return {
                success: false,
                message: 'Comment creation failed',
            };
        }

        return {
            success: true,
            message: 'Comment created successfully',
        };
    },
});

export const updateComment = mutation({
    args: { commentId: v.id('comments'), text: v.string() },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (userId === null) {
            throw new Error('You need to be logged in');
        }

        const user = await ctx.db.get(userId);

        if (!user || !hasPermission(user, 'comments', 'delete')) {
            return {
                success: false,
                message: 'Insufficient permissions for this action',
            };
        }

        await ctx.db.patch(args.commentId, {
            text: args.text,
        });

        return {
            success: true,
            message: 'Comment updated successfully',
        };
    },
});
