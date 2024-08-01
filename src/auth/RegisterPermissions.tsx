'use client';

import { useStableQuery } from '@/hooks/useStableQuery';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';
import { api } from '../../convex/_generated/api';
import { Authenticated } from 'convex/react';

export default function RegisterPermissions({
    children,
}: {
    children: ReactNode;
}) {
    const router = useRouter();
    const user = useStableQuery(api.users.getUser);

    useEffect(() => {
        if (user === undefined) return;

        if (user === null) return;

        if (user.role !== undefined) {
            return router.push('/dashboard');
        }
    }, [router, user]);

    return <Authenticated>{children}</Authenticated>;
}
