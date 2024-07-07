import { Id } from '../../convex/_generated/dataModel';

export type Testimonials = Testimonial[];

export interface Testimonial {
    comment: Comment | null;
    rating: Rating;
    user: User | null;
}

export interface Comment {
    _creationTime: number;
    _id: Id<'comments'>;
    jobId: Id<'jobs'>;
    text: string;
    userId: string;
}

export interface Rating {
    _creationTime: number;
    _id: Id<'ratings'>;
    applicantId: string;
    category: string;
    jobId: string;
    ratings?: number;
    recruiterId: string;
}

export interface User {
    _creationTime: number;
    _id: Id<'users'>;
    email?: string;
    image?: string;
    name?: string;
    role?: string;
}
