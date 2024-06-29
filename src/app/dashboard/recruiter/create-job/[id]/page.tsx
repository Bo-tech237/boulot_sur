'use client';

import React from 'react';
import UpdateJob from '../UpdateJob';
import { Id } from '../../../../../../convex/_generated/dataModel';
import { api } from '../../../../../../convex/_generated/api';
import { jobApiTypes } from '@/lib/jobSchema';
import { useStableQuery } from '@/hooks/useStableQuery';

type PageProps = { params: { id: string } };

export default function UpdateJobPage({ params: { id } }: PageProps) {
    const job = useStableQuery(
        api.jobs.getJobById,
        id ? { jobId: id as Id<'jobs'> } : 'skip'
    ) as jobApiTypes;

    if (job === undefined) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading Job...
            </div>
        );
    }

    return <div className="my-3">{id && <UpdateJob job={job} />}</div>;
}
