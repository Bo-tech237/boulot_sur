import { convexAuth } from '@convex-dev/auth/server';
import Google from '@auth/core/providers/google';
import { api } from './_generated/api';
import { fetchQuery, fetchMutation } from 'convex/nextjs';

export const { auth, signIn, signOut, store } = convexAuth({
    providers: [
        Google,
        {
            id: 'brevo',
            type: 'email',
            from: process.env.GMAIL_USER!,
            server: {},
            maxAge: 24 * 60 * 60,
            name: 'Email',
            options: {},
            sendVerificationRequest: async (params) => {
                const { identifier: email, url } = params;
            },
        },
    ],
    callbacks: {
        async afterUserCreatedOrUpdated(ctx, args) {
            if (args.existingUserId) return;

            return await ctx.db.patch(args.userId, {
                roles: ['user'],
            });
        },
    },
});
