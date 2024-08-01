'use client';

import { useStableQuery } from '@/hooks/useStableQuery';
import { api } from '../../../convex/_generated/api';
import JobCard from './JobCard';
import { Loader2 } from 'lucide-react';

export default function JobCardList({ search }: { search?: string }) {
    const jobs = useStableQuery(api.jobs.getJobBySearch, {
        search: search || '',
    });

    if (jobs === undefined) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading Jobs...
            </div>
        );
    }

    return (
        <div className="">
            <div className="container mx-auto grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {jobs?.length !== 0 &&
                    jobs?.map((job) => (
                        <div key={job._id}>
                            <JobCard job={job} />
                        </div>
                    ))}
            </div>

            {(jobs?.length === 0 || !jobs) && (
                <div className="text-center py-10 text-2xl text-red-900">
                    No job available
                </div>
            )}
        </div>
    );
}
