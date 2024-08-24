'use client';

import { useStableQuery } from '@/hooks/useStableQuery';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import H1 from '@/components/ui/h1';
import JobCard from '../../jobs/JobCard';

export default function JobsByCategory({ id }: { id: string }) {
    const jobsWithCategory = useStableQuery(api.jobs.getJobsByCategory, {
        categoryId: id as Id<'categories'>,
    });

    if (jobsWithCategory?.jobs === undefined) {
        return (
            <div className="flex py-5 items-center justify-center">
                Loading Jobs...
            </div>
        );
    }

    return (
        <div className="py-20">
            <div className="text-center py-10">
                <H1>
                    {jobsWithCategory?.category !== null &&
                        `All ${jobsWithCategory?.category.name} Jobs`}
                </H1>

                <div>
                    {jobsWithCategory.jobs.length === 0 && (
                        <div className="text-red-600 py-10 text-center text-2xl">
                            NO {jobsWithCategory?.category.name} job found
                        </div>
                    )}
                </div>
            </div>
            <div className="container mx-auto grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {jobsWithCategory?.jobs !== null &&
                    jobsWithCategory.jobs?.map((job) => (
                        <div key={job._id}>
                            <JobCard job={job} />
                        </div>
                    ))}
            </div>
            <div className="text-center">
                {jobsWithCategory === null && 'No job found'}
            </div>
        </div>
    );
}
