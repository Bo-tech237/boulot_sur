import * as z from 'zod';

export const magicLinkSchema = z.object({
    email: z.string().min(1, { message: 'Email required' }).email(),
});

export type magicLinkTypes = z.infer<typeof magicLinkSchema>;
