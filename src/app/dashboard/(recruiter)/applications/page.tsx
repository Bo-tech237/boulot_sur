'use client';

import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { api } from '../../../../../convex/_generated/api';
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

    console.log('applications', data);

    if (isPending) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading Applications...
            </div>
        );
    }

    if (!data) {
        console.log('Tanstact error:', error);

        return (
            <div className="flex py-10 items-center justify-center text-red-900 text-center">
                No application available
            </div>
        );
    }

    return (
        <div className="w-full py-10">
            <DataTable columns={columns} data={data} />

            <div className="text-red-600 text-xl">
                {data?.length === 0 && 'You have no applicant.'}
            </div>
        </div>
    );
}

export default Application;
