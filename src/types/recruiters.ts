import { Id } from '../../convex/_generated/dataModel';

export type RecruiterDataType = {
    _creationTime?: number;
    _id?: Id<'users'> | Id<'recruiters'>;
    city?: string;
    country?: string;
    description?: string;
    email?: string;
    image?: string;
    name?: string;
    phone?: string | number;
    emailVerificationTime?: number;
    phoneVerificationTime?: number;
    isAnonymous?: boolean;
    rating?: number;
    role?: string;
    userId?: Id<'users'>;
};
