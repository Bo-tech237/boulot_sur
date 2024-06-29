'use client';

import { Session } from 'next-auth';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import RegisterDialog from '@/components/RegisterDialog';
import RegisterRecruiter from '@/components/RegisterRecruiter';
import { useStableQuery } from '@/hooks/useStableQuery';

type Props = {
    session: Session;
};

export default function RecruiterWelcome({ session }: Props) {
    const recruiter = useStableQuery(api.recruiters.getRecruiterOnlyById, {
        userId: session?.user.id as Id<'users'>,
    });

    if (recruiter === undefined) {
        return (
            <div className="flex py-5 items-center justify-center">
                Loading Recruiter...
            </div>
        );
    }

    if (recruiter === null) {
        return (
            <div>
                <RegisterRecruiter />
            </div>
        );
    }

    return <div>Welcome {session.user.name}</div>;
}
