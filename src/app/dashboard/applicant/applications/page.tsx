'use client';

import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Metadata } from 'next';
import { api } from '../../../../../convex/_generated/api';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';

import { useStableQuery } from '@/hooks/useStableQuery';
import { Loader2 } from 'lucide-react';

// export const metadata: Metadata = {
//     title: 'Applications',

//     description: 'Find your dream job in Cameroon!',
// };

function Applications() {
    const { data, isPending, error } = useQuery(
        convexQuery(api.applications.getAllApplictions, {})
    );

    // const applications = useStableQuery(api.applications.getAllApplictions);
    console.log('applications', data);

    // if (applications === undefined) {
    //     return (
    //         <div className="flex h-screen items-center justify-center">
    //             Loading Applications...
    //         </div>
    //     );
    // }

    return (
        <div className="w-full py-10">
            {isPending && (
                <div className="flex gap-2 text-lg py-5 items-center justify-center">
                    <Loader2 size={50} className="animate-spin" />
                    Loading Applications...
                </div>
            )}
            {data && <DataTable columns={columns} data={data} />}
            {data?.length === 0 && (
                <div className="text-red-600 text-xl">
                    You did not apply for any job.
                </div>
            )}
        </div>
    );
}

export default Applications;
