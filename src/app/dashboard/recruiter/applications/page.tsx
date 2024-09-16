'use client';

import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { api } from '../../../../../convex/_generated/api';
import { useStableQuery } from '@/hooks/useStableQuery';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { Loader2 } from 'lucide-react';

// export const metadata: Metadata = {
//     title: 'Applications',

//     description: 'Find your dream job in Cameroon!',
// };

function Application() {
    const { data, isPending, error } = useQuery(
        convexQuery(api.applications.getAllApplictions, {})
    );

    // const applications = useStableQuery(api.applications.getAllApplictions);

    // if (applications === undefined) {
    //     return (
    //         <div className="flex h-screen items-center justify-center">
    //             Loading Applications...
    //         </div>
    //     );
    // }

    console.log('applications', data);

    return (
        <div className="w-full py-10">
            {isPending && (
                <div className="flex gap-2 text-lg py-5 items-center justify-center">
                    <Loader2 size={50} className="animate-spin" />
                    Loading Applications...
                </div>
            )}
            <DataTable columns={columns} data={data!} />

            <div className="text-red-600 text-xl">
                {data?.length === 0 && 'You have no applicant.'}
            </div>
        </div>
    );
}

export default Application;
