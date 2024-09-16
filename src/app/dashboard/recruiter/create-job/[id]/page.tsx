'use client';

import React from 'react';
import UpdateJob from '../UpdateJob';
import { Id } from '../../../../../../convex/_generated/dataModel';
import { api } from '../../../../../../convex/_generated/api';
import { jobApiTypes } from '@/lib/jobSchema';
import { useStableQuery } from '@/hooks/useStableQuery';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { Loader2 } from 'lucide-react';

type PageProps = { params: { id: string } };

export default function UpdateJobPage({ params: { id } }: PageProps) {
    const { data, isPending, error } = useQuery(
        convexQuery(api.jobs.getJobById, {
            jobId: id as Id<'jobs'>,
        })
    );

    // const job = useStableQuery(
    //     api.jobs.getJobById,
    //     id ? { jobId: id as Id<'jobs'> } : 'skip'
    // ) as jobApiTypes;

    // if (job === undefined) {
    //     return (
    //         <div className="flex h-screen items-center justify-center">
    //             Loading Job...
    //         </div>
    //     );
    // }

    return (
        <div className="my-3">
            {isPending && (
                <div className="flex gap-2 text-lg py-5 items-center justify-center">
                    <Loader2 size={50} className="animate-spin" />
                    Loading Jobs...
                </div>
            )}
            {id && <UpdateJob job={data!} />}
        </div>
    );
}
