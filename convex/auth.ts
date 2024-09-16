import { convexAuth } from '@convex-dev/auth/server';
import Google from '@auth/core/providers/google';
import Nodemailer from '@auth/core/providers/nodemailer';

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

                const data = {
                    sender: {
                        name: 'Ferdinand',
                        email: process.env.GMAIL_USER!,
                    },
                    to: [
                        {
                            email: email,
                            name: email,
                        },
                    ],
                    subject: 'Sign in to Boulot sur',
                    htmlContent: `
              <html>
                <head></head>
                <body>
                  <p>Hello,</p>
                  <p>Click <a href="${url}">here</a> to login!</p>
                  <p>Your secure login awaits for quick jobs.</p>
                </body>
              </html>
            `,
                };
                const headers = new Headers({
                    accept: 'application/json',
                    'api-key': process.env.BREVO_API_KEY as string,
                    'content-type': 'application/json',
                });

                fetch('https://api.brevo.com/v3/smtp/email', {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data),
                })
                    .then((response) => response.json())
                    .then((result) => {
                        console.log('magic error', result);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            },
        },
    ],
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
