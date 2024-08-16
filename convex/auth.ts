import { convexAuth } from '@convex-dev/auth/server';
import Google from '@auth/core/providers/google';
import Nodemailer from '@auth/core/providers/nodemailer';

export const { auth, signIn, signOut, store } = convexAuth({
    providers: [Google],
    callbacks: {
        async createOrUpdateUser(ctx, args) {
            if (args.existingUserId) {
                return args.existingUserId;
            }

            return ctx.db.insert('users', {
                email: args.profile.email,
                emailVerified: args.profile.emailVerified,
                image: args.profile.image,
                name: args.profile.name,
                phone: args.profile.phone,
                phoneVerified: args.profile.phoneVerified,
                role: 'user',
            });
        },
    },
});
