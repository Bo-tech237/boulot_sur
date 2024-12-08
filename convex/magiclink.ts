import { v } from 'convex/values';
import { action } from './_generated/server';

export const brevoMagicLink = action({
    args: { email: v.string(), url: v.string() },
    handler: async (ctx, { email, url }) => {
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

        return await fetch('https://api.brevo.com/v3/smtp/email', {
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
});
