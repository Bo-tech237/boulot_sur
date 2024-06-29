import { Id } from './_generated/dataModel';
import { query, mutation } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import {
    getAll,
    getOneFrom,
    getManyFrom,
    getManyVia,
} from 'convex-helpers/server/relationships';

export const getAllComments = query({
    args: {},
    handler: async (ctx, args) => {
        return await ctx.db.query('comments').order('desc').collect();
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
