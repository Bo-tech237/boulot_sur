import * as z from 'zod';

export const loginSchema = z.object({
    email: z.string().min(1, { message: 'Email required' }).email(),
    password: z.string().min(1, { message: 'Password required' }).min(6, {
        message: 'Password must be at least 6 characters.',
    }),
    accountType: z.string(),
});

export type loginUser = z.infer<typeof loginSchema>;
