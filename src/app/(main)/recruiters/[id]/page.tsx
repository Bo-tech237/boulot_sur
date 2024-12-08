'use client';

import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import React from 'react';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import Hero from '../../recruiter/[id]/Hero';
import JobCard from '../../jobs/JobCard';
import { Loader2 } from 'lucide-react';

type Prop = {
    params: { id: string };
};

export default function RecruiterJobs({ params }: Prop) {
    const id = params.id;

    const {
        data: jobs,
        isPending,
        error,
    } = useQuery(
        convexQuery(api.jobs.getAllRecruiterJobs, { userId: id as Id<'users'> })
    );

    if (isPending) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading Jobs...
            </div>
        );
    }

    if (!jobs) {
        console.log('error', error);
        return (
            <div className="flex py-10 items-center justify-center text-red-900 text-center">
                No job available
            </div>
        );
    }

    return (
        <div>
            <section className="pt-28 pb-28 bg-red-900 text-white bg-center bg-cover relative">
                <Hero />
            </section>
            <div className="container mx-auto my-5 grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {jobs?.map((job) => (
                    <div key={job._id}>
                        <JobCard job={job} />
                    </div>
                ))}
            </div>
        </div>
    );
}
