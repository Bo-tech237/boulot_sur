'use client';

import { Metadata } from 'next';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';
import UpdateApplicant from '../UpdateApplicant';
import { useStableQuery } from '@/hooks/useStableQuery';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { Loader2 } from 'lucide-react';

type Props = { id: string };

export const metadata: Metadata = {
    title: 'Update Profile',

    description: 'Find your dream job in Cameroon!',
};

function UpdateProfile({ id }: Props) {
    const { data, isPending, error } = useQuery(
        convexQuery(api.applicants.getApplicantOnlyById, {
            userId: id as Id<'users'>,
        })
    );

    // const applicant = useStableQuery(
    //     api.applicants.getApplicantOnlyById,
    //     id
    //         ? {
    //               userId: id as Id<'users'>,
    //           }
    //         : 'skip'
    // );

    // if (applicant === undefined) {
    //     return <div className="text-center">Loading Applicant...</div>;
    // }

    return (
        <div className="flex flex-col gap-3">
            {isPending && (
                <div className="flex gap-2 text-lg py-5 items-center justify-center">
                    <Loader2 size={50} className="animate-spin" />
                    Loading Applicant...
                </div>
            )}
            {data && <UpdateApplicant applicant={data} />}
        </div>
    );
}

export default UpdateProfile;
