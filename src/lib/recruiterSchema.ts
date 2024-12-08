import * as z from 'zod';

// export function createRecruiterSchema(isEdit: boolean) {
//     let passwordSchema = isEdit
//         ? z
//               .string()
//               .min(6, {
//                   message: 'Password must be at least 6 characters.',
//               })
//               .optional()
//         : z.string().min(1, { message: 'Password required' }).min(6, {
//               message: 'Password must be at least 6 characters.',
//           });

//     return z.object({
//         name: z.string().min(1, { message: 'Username required' }).min(3, {
//             message: 'Username must be at least 3 characters.',
//         }),
//         email: z.string().min(1, { message: 'Email required' }).email(),
//         password: passwordSchema,
//         country: z.string().min(1, { message: 'Country required' }),
//         city: z.string().min(1, { message: 'City required' }),
//         postal: z.string().optional(),
//         phone: z.string().min(1, { message: 'Phone number required' }).min(8, {
//             message: 'Phone number must be at least 8 digits.',
//         }),
//         description: z
//             .string()
//             .min(1, { message: 'Description required' })
//             .min(10, {
//                 message: 'Description must be at least 10 characters.',
//             })
//             .max(160, {
//                 message: 'Description must not be longer than 160 characters.',
//             }),
//     });
// }

export const recruiterSchema = z.object({
    country: z.string().min(1, { message: 'Country required' }),
    city: z.string().min(1, { message: 'City required' }),
    phone: z.coerce
        .number()
        .min(1, { message: 'Phone number required' })
        .min(8, {
            message: 'Phone number must be at least 8 digits.',
        }),
    description: z
        .string()
        .min(1, { message: 'Description required' })
        .min(10, {
            message: 'Description must be at least 10 characters.',
        })
        .max(160, {
            message: 'Description must not be longer than 160 characters.',
        }),
});

export const recruiterSchemaApi = recruiterSchema.extend({
    _id: z.string(),
    role: z.string(),
    rating: z.coerce.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type recruiterApiTypes = z.infer<typeof recruiterSchemaApi>;
export type recruiterTypes = z.infer<typeof recruiterSchema>;
