import { Id } from '../../convex/_generated/dataModel';

export type ApplicationDataType = {
    _creationTime: number;
    _id: Id<'applications'>;
    applicant: Applicant;
    applicantId: string;
    job: Job | null;
    jobId: string;
    recruiter: Recruiter;
    recruiterId: string;
    sop: string;
    status: string;
};

export interface Applicant {
    _creationTime?: number;
    _id?: Id<'users'> | Id<'applicants'>;
    education?: Education[];
    email?: string;
    fileId?: Id<'_storage'>;
    image?: string;
    name?: string;
    rating?: number;
    role?: string;
    skills?: Skill[];
    userId?: Id<'users'>;
    fileUrl: string | null;
}

export interface Education {
    endYear: string;
    institutionName: string;
    startYear: string;
}

export interface Skill {
    id: string;
    text: string;
}

export interface Job {
    _creationTime: number;
    _id: Id<'jobs'>;
    acceptedApplicants?: number;
    activeApplications?: number;
    description: string;
    location: string;
    maxApplicants: number;
    maxPositions: number;
    rating?: number;
    salary: number;
    skillsets: Skillset[];
    title: string;
    type: string;
    updatedAt?: number;
    userId: Id<'users'>;
}

export interface Skillset {
    id: string;
    text: string;
}

export interface Recruiter {
    _creationTime?: number;
    _id?: Id<'users'> | Id<'recruiters'>;
    city?: string;
    country?: string;
    description?: string;
    email?: string;
    image?: string;
    name?: string;
    phone?: string | number;
    rating?: number;
    role?: string;
    userId?: Id<'users'>;
}
