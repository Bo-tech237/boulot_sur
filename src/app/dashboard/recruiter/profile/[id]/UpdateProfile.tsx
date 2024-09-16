'use client';
import RegisterRecruiter from '@/components/RegisterRecruiter';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';
import { useStableQuery } from '@/hooks/useStableQuery';
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

    // const recruiter = useStableQuery(
    //     api.recruiters.getRecruiterOnlyById,
    //     id
    //         ? {
    //               userId: id as Id<'users'>,
    //           }
    //         : 'skip'
    // );

    // if (recruiter === undefined) {
    //     return (
    //         <div className="flex h-screen items-center justify-center">
    //             Loading Recruiter...
    //         </div>
    //     );
    // }

    return (
        <div>
            {isPending && (
                <div className="flex gap-2 text-lg py-5 items-center justify-center">
                    <Loader2 size={50} className="animate-spin" />
                    Loading Recruiter...
                </div>
            )}
            {data && <RegisterRecruiter recruiter={data!} />}
        </div>
    );
}

export default UpdateProfile;
