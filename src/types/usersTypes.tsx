import { Id } from '../../convex/_generated/dataModel';

export type UsersTypes = {
    _id: Id<'users'>;
    _creationTime: number;
    name?: string;
    image?: string;
    email?: string;
    emailVerificationTime?: number;
    phone?: string;
    phoneVerificationTime?: number;
    isAnonymous?: boolean;
    roles?: ('user' | 'admin' | 'recruiter' | 'applicant')[];
};
