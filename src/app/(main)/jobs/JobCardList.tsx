'use client';

import JobCard from './JobCard';
import { Loader2 } from 'lucide-react';
import { api } from '../../../../convex/_generated/api';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';

export default function JobCardList({ search }: { search?: string }) {
    const { data, isPending, error } = useQuery(
        convexQuery(api.jobs.getJobBySearch, { search: search || '' })
    );

    if (isPending) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading Jobs...
            </div>
        );
    }

    if (!data) {
        console.log('error', error);
        return (
            <div className="flex py-10 items-center justify-center text-red-900">
                No job available
            </div>
        );
    }

    return (
        <div>
            <div className="container mx-auto grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {data?.map((job) => (
                    <div key={job._id}>
                        <JobCard job={job} />
                    </div>
                ))}
            </div>
            {data.length === 0 && (
                <div className="flex py-10 items-center justify-center text-red-900 font-bold text-2xl">
                    No job available
                </div>
            )}
        </div>
    );
}
