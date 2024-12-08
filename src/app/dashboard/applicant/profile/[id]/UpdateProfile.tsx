'use client';

import { Metadata } from 'next';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';
import UpdateApplicant from '../UpdateApplicant';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { Loader2 } from 'lucide-react';

type Props = { id: string };

export const metadata: Metadata = {
    title: 'Update Profile',
};

function UpdateProfile({ id }: Props) {
    const { data, isPending, error } = useQuery(
        convexQuery(api.applicants.getApplicantOnlyById, {
            userId: id as Id<'users'>,
        })
    );

    if (isPending) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading Applicant...
            </div>
        );
    }

    if (!data) {
        console.log('error:', error);
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                Data not available
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            <UpdateApplicant applicant={data} />
        </div>
    );
}

export default UpdateProfile;
