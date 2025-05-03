import * as z from 'zod';
import { jobTypes } from '@/constants/data';



export const step1Schema = z.object({
    title: z.string().min(1, { message: 'Title required' }).min(3, {
        message: 'Title must be at least 3 characters.',
    }),
    maxApplicants: z.coerce.number().min(1, "Max applicants required"),
    maxPositions: z.coerce.number().min(1, "Max positions required"),
  });
  
  export const step2Schema = z.object({
    type: z
    .string()
    .min(1, { message: 'Type required' })
    .refine((value) => jobTypes.includes(value), 'Invalid job type'),
    category: z.string().min(1, "Category required"),
    location: z.string().min(1, "Location required"),
    salary: z.coerce.number().min(1, "Salary required"),
  });
  
  export const step3Schema = z.object({
    description: z
        .string()
        .min(1, { message: 'Description required' })
        .min(10, {
            message: 'Description must be at least 10 characters.',
        }),
    skillsets: z.array(
      z.object({
        id: z.string(),
        text: z.string(),
      })
    ).min(1, "Skills required"),
  });

export const applyJobSchema = z.object({
    sop: z
        .string()
        .min(1, { message: 'Statement of purpose required' })
        .min(10, {
            message: 'Statement of purpose must be at least 10 characters.',
        })
        .max(160, {
            message:
                'Statement of purpose must not be longer than 160 characters.',
        }),
});

export const jobSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export const jobSchemaApi = jobSchema.extend({
    _id: z.string(),
});

export type jobsTypes = z.infer<typeof jobSchema>;
export type jobApiTypes = z.infer<typeof jobSchemaApi>;
