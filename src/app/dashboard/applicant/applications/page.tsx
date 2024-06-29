'use client';

import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Metadata } from 'next';
import { api } from '../../../../../convex/_generated/api';

import { useStableQuery } from '@/hooks/useStableQuery';

// export const metadata: Metadata = {
//     title: 'Applications',

//     description: 'Find your dream job in Cameroon!',
// };

function Applications() {
    const applications = useStableQuery(api.applications.getAllApplictions);
    console.log('applications', applications);

    if (applications === undefined) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading Applications...
            </div>
        );
    }

    return (
        <div className="w-full py-10">
            {applications && (
                <DataTable columns={columns} data={applications} />
            )}
            {applications?.length === 0 && (
                <div className="text-red-600 text-xl">
                    You did not apply for any job.
                </div>
            )}
        </div>
    );
}

export default Applications;
