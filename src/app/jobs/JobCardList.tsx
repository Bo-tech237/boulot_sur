'use client';

import { useStableQuery } from '@/hooks/useStableQuery';
import { api } from '../../../convex/_generated/api';
import JobCard from './JobCard';

export default function JobCardList({ search }: { search?: string }) {
    const jobs = useStableQuery(api.jobs.getJobBySearch, {
        search: search || '',
    });

    if (jobs === undefined) {
        return (
            <div className="flex py-5 items-center justify-center">
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
            <div className="text-center">
                {jobs?.length === 0 && 'No job found'}
            </div>
        </div>
    );
}
