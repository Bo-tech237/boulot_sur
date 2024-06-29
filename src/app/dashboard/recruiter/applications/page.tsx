'use client';

import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { api } from '../../../../../convex/_generated/api';
import { useConvexAuth, useQuery } from 'convex/react';

// export const metadata: Metadata = {
//     title: 'Applications',

//     description: 'Find your dream job in Cameroon!',
// };

function Application() {
    const applications = useQuery(api.applications.getAllApplictions);

    if (applications === undefined) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading Applications...
            </div>
        );
    }

    console.log('applications', applications);

    return (
        <div className="w-full py-10">
            <DataTable columns={columns} data={applications} />

            <div className="text-red-600 text-xl">
                {applications.length === 0 && 'You have no applicant.'}
            </div>
        </div>
    );
}

export default Application;
