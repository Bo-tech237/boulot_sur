'use client';

import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Metadata } from 'next';
import { api } from '../../../../../convex/_generated/api';
import { useStableQuery } from '@/hooks/useStableQuery';

// export const metadata: Metadata = {
//     title: 'My Jobs',

//     description: 'Find your dream job in Cameroon!',
// };

function MyJobs() {
    const jobs = useStableQuery(api.jobs.getAllRecruiterJobsWithoutId);

    if (jobs === undefined) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading Jobs...
            </div>
        );
    }

    return (
        <div className="w-full py-10">
            {jobs !== null && <DataTable columns={columns} data={jobs} />}
            {jobs === null && (
                <div className="text-red-900 text-xl">No jobs found</div>
            )}
        </div>
    );
}

export default MyJobs;
