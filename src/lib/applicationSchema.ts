import * as z from 'zod';

export const applicationSchema = z.object({
    applicantId: z.string().min(1, { message: 'ApplicantId required' }),
    recruiterId: z.string().min(1, { message: 'RecruiterId required' }),
    jobId: z.string().min(1, { message: 'JobId required' }),
    status: z.string().min(1, { message: 'Status required' }),
    sop: z
        .string()
        .min(1, { message: 'Description required' })
        .min(10, {
            message: 'Description must be at least 10 characters.',
        })
        .max(160, {
            message: 'Description must not be longer than 160 characters.',
        }),
});

export const applicationSchemaApi = applicationSchema.extend({
    _id: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export type applicationApiTypes = z.infer<typeof applicationSchemaApi>;
export type applicationTypes = z.infer<typeof applicationSchema>;
