import { v } from 'convex/values';
import { action, internalAction } from './_generated/server';

export const newUserEmail = internalAction({
    args: { email: v.string(), name: v.string() },
    handler: async (ctx, args) => {
        const newUser = await fetch('http://localhost:3000/api/email/newUser', {
            method: 'POST',
            body: JSON.stringify({ email: args.email, name: args.name }),
        });

        console.log('convex email', newUser);
        return newUser;
    },
});

export const deleteUserEmail = internalAction({
    args: { email: v.string(), name: v.string() },
    handler: async (ctx, args) => {
        const deletedUser = await fetch(
            'http://localhost:3000/api/email/deleteUser',
            {
                method: 'POST',
                body: JSON.stringify({ email: args.email, name: args.name }),
            }
        );
        console.log('convex email', deletedUser);
        return deletedUser;
    },
});
