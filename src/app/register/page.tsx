import React from 'react';
import RegisterTabs from './RegisterTabs';
import getSession from '@/lib/getSession';
import { redirect } from 'next/navigation';

export default async function RegisterPage() {
    // const session = await getSession();
    // if (session?.user.role !== 'user') {
    //     return redirect('/dashboard');
    // } else if (!session) {
    //     return;
    // }

    return (
        <div className="flex items-center justify-center">
            <RegisterTabs />
        </div>
    );
}
