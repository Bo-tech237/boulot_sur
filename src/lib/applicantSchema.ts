import * as z from "zod";

const fileSizeLimit = 5 * 1024 * 1024; // 5MB

// Reusable sub-schemas
const educationItemSchema = z.object({
  institutionName: z
    .string()
    .min(3, { message: "Institution name must be at least 3 characters." }),
  startYear: z.string().min(1, { message: "Start year required" }),
  endYear: z.string().min(1, { message: "End year required" }),
});

const skillSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export const fileSchema = z
  .instanceof(File)
  .refine((file) => ["application/pdf"].includes(file.type), {
    message: "Invalid document file type",
  })
  .refine((file) => file.size <= fileSizeLimit, {
    message: "File size should not exceed 5MB",
  });

// Step 1: Education
export const step1Schema = z.object({
  education: z.array(educationItemSchema),
});

// Step 2: Skills and File Upload
export const step2Schema = z.object({
  skills: z.array(skillSchema).min(1, { message: "Skills required" }),
  file: fileSchema,
});
export const updateCVSchema = z.object({
  file: fileSchema,
});

export const applicantUpdateSchema = z.object({
  education: z.array(educationItemSchema),
  skills: z.array(skillSchema).min(1, { message: "Skills required" }),
});

export const applicantSchema = step1Schema.merge(step2Schema);

export type updateCVTypes = z.infer<typeof updateCVSchema>;
export type applicantTypes = z.infer<typeof applicantSchema>;
export type applicantUpdateTypes = z.infer<typeof applicantUpdateSchema>;
