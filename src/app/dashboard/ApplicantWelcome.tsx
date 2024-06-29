'use client';

import { Session } from 'next-auth';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import RegisterApplicant from '@/components/RegisterApplicant';
import { useStableQuery } from '@/hooks/useStableQuery';

type Props = {
    session: Session;
};

export default function ApplicantWelcome({ session }: Props) {
    const applicant = useStableQuery(api.applicants.getApplicantOnlyById, {
        userId: session?.user.id as Id<'users'>,
    });

    if (applicant === undefined) {
        return (
            <div className="flex py-5 items-center justify-center">
                Loading Applicant...
            </div>
        );
    }

    if (applicant === null) {
        return (
            <div>
                <RegisterApplicant />
            </div>
        );
    }

    return <div>Welcome {session.user.name}</div>;
}
