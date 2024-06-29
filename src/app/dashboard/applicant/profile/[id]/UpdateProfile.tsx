'use client';

import { Metadata } from 'next';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';
import UpdateApplicant from '../UpdateApplicant';
import { useStableQuery } from '@/hooks/useStableQuery';

type Props = { id: string };

export const metadata: Metadata = {
    title: 'Update Profile',

    description: 'Find your dream job in Cameroon!',
};

function UpdateProfile({ id }: Props) {
    const applicant = useStableQuery(
        api.applicants.getApplicantOnlyById,
        id
            ? {
                  userId: id as Id<'users'>,
              }
            : 'skip'
    );

    if (applicant === undefined) {
        return <div className="text-center">Loading Applicant...</div>;
    }

    return (
        <div className="flex flex-col gap-3">
            {applicant && <UpdateApplicant applicant={applicant} />}
        </div>
    );
}

export default UpdateProfile;
