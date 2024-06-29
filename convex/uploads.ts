import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx, args) => {
        // Return an upload URL

        // const identity = await ctx.auth.getUserIdentity();

        // if (identity === null) {
        //     throw new Error('Unauthenticated call to mutation');
        // }

        return await ctx.storage.generateUploadUrl();
    },
});
