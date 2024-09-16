'use client';

import { useStableQuery } from '@/hooks/useStableQuery';
import JobCard from './JobCard';
import { Loader2 } from 'lucide-react';
import { api } from '../../../../convex/_generated/api';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';

export default function JobCardList({ search }: { search?: string }) {
    const { data, isPending, error } = useQuery(
        convexQuery(api.jobs.getJobBySearch, { search: search || '' })
    );

    // const jobs = useStableQuery(api.jobs.getJobBySearch, {
    //     search: search || '',
    // });

    // if (jobs === undefined) {
    //     return (
    //         <div className="flex gap-2 text-lg py-5 items-center justify-center">
    //             <Loader2 size={50} className="animate-spin" />
    //             Loading Jobs...
    //         </div>
    //     );
    // }

    return (
        <div>
            {isPending && (
                <div className="flex gap-2 text-lg py-5 items-center justify-center">
                    <Loader2 size={50} className="animate-spin" />
                    Loading Jobs...
                </div>
            )}
            <div className="container mx-auto grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {data?.length !== 0 &&
                    data?.map((job) => (
                        <div key={job._id}>
                            <JobCard job={job} />
                        </div>
                    ))}
            </div>

            {(data?.length === 0 || !data) && (
                <div className="text-center py-10 text-2xl text-red-900">
                    No job available
                </div>
            )}
        </div>
    );
}
