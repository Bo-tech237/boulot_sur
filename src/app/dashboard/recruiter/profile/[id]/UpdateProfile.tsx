'use client';
import RegisterRecruiter from '@/components/RegisterRecruiter';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';
import { useStableQuery } from '@/hooks/useStableQuery';

type Props = { id: string };

function UpdateProfile({ id }: Props) {
    const recruiter = useStableQuery(
        api.recruiters.getRecruiterOnlyById,
        id
            ? {
                  userId: id as Id<'users'>,
              }
            : 'skip'
    );

    if (recruiter === undefined) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading Recruiter...
            </div>
        );
    }

    return (
        <div>{recruiter && <RegisterRecruiter recruiter={recruiter} />}</div>
    );
}

export default UpdateProfile;
