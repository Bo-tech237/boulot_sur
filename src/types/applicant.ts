import { Id } from '../../convex/_generated/dataModel';

export type ApplicantDataType = {
    _creationTime?: number;
    _id?: Id<'users'> | Id<'applicants'>;
    education?: Education[];
    email?: string;
    fileId?: Id<'_storage'>;
    image?: string;
    name?: string;
    phone?: string | number;
    emailVerificationTime?: number;
    phoneVerificationTime?: number;
    isAnonymous?: boolean;
    rating?: number;
    role?: string;
    skills?: Skill[];
    userId?: Id<'users'>;
    fileUrl: string | null;
};

export interface Education {
    endYear: string;
    institutionName: string;
    startYear: string;
}

export interface Skill {
    id: string;
    text: string;
}
