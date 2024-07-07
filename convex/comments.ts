import { query, mutation } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { asyncMap } from 'convex-helpers';

export const getBestReviews = query({
    args: {},
    handler: async (ctx, args) => {
        const comments = await ctx.db.query('comments').order('desc').take(5);

        const reviews = await asyncMap(comments, async (comment) => {
            const user = await ctx.db.get(comment.userId);

            const rating = await ctx.db
                .query('ratings')
                .withIndex('byJobId', (q) => q.eq('jobId', comment.jobId))
                .filter((q) =>
                    q.and(
                        q.gte(q.field('ratings'), 3),
                        q.or(
                            q.and(
                                q.eq(q.field('applicantId'), comment.userId),
                                q.eq(q.field('category'), 'job')
                            ),
                            q.and(
                                q.eq(q.field('recruiterId'), comment.userId),
                                q.eq(q.field('category'), 'applicant')
                            )
                        )
                    )
                )
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

        return reviews;
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

        return reviews;
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
        const identity = await ctx.auth.getUserIdentity();

        if (identity === null) {
            throw new ConvexError('Unauthenticated call to mutation');
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
        const identity = await ctx.auth.getUserIdentity();

        if (identity === null) {
            throw new ConvexError('Unauthenticated call to mutation');
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
