import * as z from 'zod';

export const commentSchema = z.object({
    text: z.string().min(1, { message: 'Text required' }).min(5, {
        message: 'Text must be at least 5 characters.',
    }),
});

export type commentTypes = z.infer<typeof commentSchema>;
