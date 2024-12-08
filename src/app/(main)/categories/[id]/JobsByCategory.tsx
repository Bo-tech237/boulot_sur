'use client';

import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import H1 from '@/components/ui/h1';
import JobCard from '../../jobs/JobCard';
import { Loader2 } from 'lucide-react';

export default function JobsByCategory({ id }: { id: string }) {
    const { data, isPending, error } = useQuery(
        convexQuery(api.jobs.getJobsByCategory, {
            categoryId: id as Id<'categories'>,
        })
    );

    if (isPending) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading Profile...
            </div>
        );
    }

    if (!data) {
        console.log('error', error);
        return (
            <div className="flex py-10 items-center justify-center">
                Profile not available
            </div>
        );
    }

    return (
        <div className="py-20">
            <div className="text-center py-10">
                <H1>
                    {data?.category !== null &&
                        `All ${data?.category.name} Jobs`}
                </H1>

                <div>
                    {data.jobs.length === 0 && (
                        <div className="text-red-600 py-10 text-center text-2xl">
                            NO {data?.category.name} job found
                        </div>
                    )}
                </div>
            </div>
            <div className="container mx-auto grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {data?.jobs !== null &&
                    data.jobs?.map((job) => (
                        <div key={job._id}>
                            <JobCard job={job} />
                        </div>
                    ))}
            </div>
            <div className="text-center">{data === null && 'No job found'}</div>
        </div>
    );
}
