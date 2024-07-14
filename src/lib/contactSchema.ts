import * as z from 'zod';

export const contactSchema = z.object({
    name: z.string().min(1, { message: 'name required' }),
    email: z.string().min(1, { message: 'Email required' }).email(),
    phone: z.coerce
        .number()
        .min(1, { message: 'Phone number required' })
        .min(8, {
            message: 'Phone number must be at least 8 digits.',
        }),
});

export type contactTypes = z.infer<typeof contactSchema>;
