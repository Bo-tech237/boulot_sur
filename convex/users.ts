import { query, internalMutation } from './_generated/server';
import { v } from 'convex/values';
import { getAuthUserId } from '@convex-dev/auth/server';

export const getUserById = query({
    args: { userId: v.id('users') },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.userId);
    },
});

export const getUser = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) {
            return null;
        }
        const user = await ctx.db.get(userId);
        console.log('user:', user);
        return user;
    },
});

export const getRecruiterUsers = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) {
            return null;
        }

        const user = await ctx.db
            .query('users')
            .withIndex('byRoles', (q) => q.eq('roles', ['user', 'recruiter']))
            .order('desc')
            .collect();

        console.log('user:', user);
        return user;
    },
});

export const getApplicantUsers = query({
    args: {},
    handler: async (ctx) => {
        const userId = await getAuthUserId(ctx);
        if (userId === null) {
            return null;
        }

        const user = await ctx.db
            .query('users')
            .withIndex('byRoles', (q) => q.eq('roles', ['user', 'applicant']))
            .order('desc')
            .collect();
        console.log('user:', user);
        return user;
    },
});

export const UpdateRole = internalMutation({
    args: {
        roles: v.array(
            v.union(
                v.literal('user'),
                v.literal('admin'),
                v.literal('recruiter'),
                v.literal('applicant')
            )
        ),
        userId: v.id('users'),
    },
    handler: async (ctx, args) => {
        return await ctx.db.patch(args?.userId, {
            roles: args.roles!,
        });
    },
});
