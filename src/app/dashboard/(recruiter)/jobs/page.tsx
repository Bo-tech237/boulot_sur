'use client';

import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { api } from '../../../../../convex/_generated/api';
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

    if (isPending) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading Jobs...
            </div>
        );
    }

    if (!data) {
        console.log('Tanstact error:', error);

        return (
            <div className="flex py-10 items-center justify-center text-red-900 text-center">
                No job available
            </div>
        );
    }

    return (
        <div className="w-full py-10">
            <DataTable columns={columns} data={data} />
            {data?.length === 0 && (
                <div className="text-red-900 text-xl">No jobs found</div>
            )}
        </div>
    );
}

export default MyJobs;
