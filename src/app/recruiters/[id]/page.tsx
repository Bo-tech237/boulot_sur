'use client';

import { useStableQuery } from '@/hooks/useStableQuery';
import React from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import JobCard from '@/app/jobs/JobCard';
import Hero from '@/app/recruiter/[id]/Hero';

type Prop = {
    params: { id: string };
};

export default function RecruiterJobs({ params }: Prop) {
    const id = params.id;
    const jobs = useStableQuery(api.jobs.getAllRecruiterJobs, {
        userId: id as Id<'users'>,
    });

    if (jobs === undefined) {
        return (
            <div className="flex py-5 items-center justify-center">
                Loading Jobs...
            </div>
        );
    }

    return (
        <div>
            <section className="pt-28 pb-28 bg-red-900 text-white bg-center bg-cover relative">
                <Hero />
            </section>
            <div className="container mx-auto grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {jobs?.length !== 0 &&
                    jobs?.map((job) => (
                        <div key={job._id}>
                            <JobCard job={job} />
                        </div>
                    ))}
            </div>
            <div className="text-center text-2xl text-red-900 my-10">
                {jobs?.length === 0 && 'No job found'}
            </div>
        </div>
    );
}
