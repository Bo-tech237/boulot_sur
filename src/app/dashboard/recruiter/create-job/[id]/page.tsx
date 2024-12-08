'use client';

import React from 'react';
import UpdateJob from '../UpdateJob';
import { Id } from '../../../../../../convex/_generated/dataModel';
import { api } from '../../../../../../convex/_generated/api';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { Loader2 } from 'lucide-react';

type PageProps = { params: { id: string } };

export default function UpdateJobPage({ params: { id } }: PageProps) {
    const {
        data: job,
        isPending,
        error,
    } = useQuery(
        convexQuery(api.jobs.getJobById, {
            jobId: id as Id<'jobs'>,
        })
    );

    if (isPending) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading Job...
            </div>
        );
    }

    if (!job) {
        console.log('error', error);
        return (
            <div className="flex py-10 items-center justify-center text-red-900 text-center">
                No job available
            </div>
        );
    }

    return <div className="my-3">{<UpdateJob job={job} />}</div>;
}
