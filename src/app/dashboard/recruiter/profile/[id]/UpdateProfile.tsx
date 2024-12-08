'use client';

import RegisterRecruiter from '@/components/RegisterRecruiter';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { Loader2 } from 'lucide-react';

type Props = { id: string };

function UpdateProfile({ id }: Props) {
    const { data, isPending, error } = useQuery(
        convexQuery(api.recruiters.getRecruiterOnlyById, {
            userId: id as Id<'users'>,
        })
    );

    if (isPending) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading Recruiter...
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
        <div>
            <RegisterRecruiter recruiter={data} />
        </div>
    );
}

export default UpdateProfile;
