'use client';

import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Metadata } from 'next';
import { api } from '../../../../../convex/_generated/api';
import { useStableQuery } from '@/hooks/useStableQuery';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { Loader2 } from 'lucide-react';

// export const metadata: Metadata = {
//     title: 'My Jobs',

//     description: 'Find your dream job in Cameroon!',
// };

function MyJobs() {
    const { data, isPending, error } = useQuery(
        convexQuery(api.jobs.getAllRecruiterJobsWithoutId, {})
    );

    // const jobs = useStableQuery(api.jobs.getAllRecruiterJobsWithoutId);

    // if (jobs === undefined) {
    //     return (
    //         <div className="flex h-screen items-center justify-center">
    //             Loading Jobs...
    //         </div>
    //     );
    // }

    return (
        <div className="w-full py-10">
            {isPending && (
                <div className="flex gap-2 text-lg py-5 items-center justify-center">
                    <Loader2 size={50} className="animate-spin" />
                    Loading Jobs...
                </div>
            )}
            {data !== null && <DataTable columns={columns} data={data!} />}
            {data === null && (
                <div className="text-red-900 text-xl">No jobs found</div>
            )}
        </div>
    );
}

export default MyJobs;
