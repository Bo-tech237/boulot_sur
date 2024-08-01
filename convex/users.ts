import { Id } from './_generated/dataModel';
import { query, mutation, internalMutation } from './_generated/server';
import { v } from 'convex/values';
import { auth } from './auth';

export const getUserById = query({
    args: { userId: v.id('users') },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.userId);
    },
});

export const getUser = query({
    args: {},
    handler: async (ctx) => {
        const userId = await auth.getUserId(ctx);

        if (userId === null) return;

        const user = await ctx.db.get(userId);

        return user;
    },
});

export const UpdateRole = internalMutation({
    args: { role: v.string(), userId: v.id('users') },
    handler: async (ctx, args) => {
        return await ctx.db.patch(args?.userId, {
            role: args.role!,
        });
    },
});
