'use client';

import React from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Metadata } from 'next';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useStableQuery } from '@/hooks/useStableQuery';

// export const metadata: Metadata = {
//     title: 'My Jobs',

//     description: 'Find your dream job in Cameroon!',
// };

function MyJobs() {
    const { data: session } = useSession();
    const router = useRouter();
    if (!session) router.push('/login');

    const jobs = useStableQuery(
        api.jobs.getAllRecruiterJobs,
        session
            ? {
                  userId: session?.user.id as Id<'users'>,
              }
            : 'skip'
    );

    if (jobs === undefined) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading Jobs...
            </div>
        );
    }

    return (
        <div className="w-full py-10">
            {jobs?.length > 0 && <DataTable columns={columns} data={jobs} />}
            {jobs?.length === 0 && (
                <div className="text-red-600 text-xl">No jobs found</div>
            )}
        </div>
    );
}

export default MyJobs;
