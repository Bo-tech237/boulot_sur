import * as z from 'zod';

// export function createApplicantSchema(isEdit: boolean) {
//     let fileSchema = isEdit
//         ? z
//               .custom<FileList | Id<'_storage'>>(
//                   (val) => val instanceof FileList
//               )
//               .refine((files) => files.length > 0)
//               .optional()
//         : z
//               .custom<
//                   FileList | Id<'_storage'>
//               >((val) => val instanceof FileList, 'Required')
//               .refine((files) => files.length > 0, 'Required');

//     return z.object({
//         education: z.array(
//             z.object({
//                 institutionName: z.string().min(3, {
//                     message: 'Institution name must be at least 3 characters.',
//                 }),
//                 startYear: z
//                     .string()
//                     .min(1, { message: 'Start year required' }),
//                 endYear: z.string().min(1, { message: 'End year required' }),
//             })
//         ),
//         skills: z
//             .array(
//                 z.object({
//                     id: z.string(),
//                     text: z.string(),
//                 })
//             )
//             .min(1, { message: 'Skills required' }),
//         fileId: fileSchema,
//     });
// }

export const applicantSchema = z.object({
    education: z.array(
        z.object({
            institutionName: z.string().min(3, {
                message: 'Institution name must be at least 3 characters.',
            }),
            startYear: z.string().min(1, { message: 'Start year required' }),
            endYear: z.string().min(1, { message: 'End year required' }),
        })
    ),
    skills: z
        .array(
            z.object({
                id: z.string(),
                text: z.string(),
            })
        )
        .min(1, { message: 'Skills required' }),
    fileId: z
        .custom<FileList>((val) => val instanceof FileList, 'Required')
        .refine((files) => files.length > 0, 'Required'),
});

export const applicantUpdateSchema = z.object({
    education: z.array(
        z.object({
            institutionName: z.string().min(3, {
                message: 'Institution name must be at least 3 characters.',
            }),
            startYear: z.string().min(1, { message: 'Start year required' }),
            endYear: z.string().min(1, { message: 'End year required' }),
        })
    ),
    skills: z
        .array(
            z.object({
                id: z.string(),
                text: z.string(),
            })
        )
        .min(1, { message: 'Skills required' }),
});

export const fileSchema = z.object({
    fileId: z
        .custom<FileList>((val) => val instanceof FileList, 'Required')
        .refine((files) => files.length > 0, 'Required'),
});

export type fileTypes = z.infer<typeof fileSchema>;
export type applicantTypes = z.infer<typeof applicantSchema>;
export type applicantUpdateTypes = z.infer<typeof applicantUpdateSchema>;
