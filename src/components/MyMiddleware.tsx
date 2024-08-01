'use client';

import { useStableQuery } from '@/hooks/useStableQuery';
import { usePathname, useRouter } from 'next/navigation';
import { api } from '../../convex/_generated/api';
import {
    publicRoutes,
    DEFAULT_LOGIN_REDIRECT,
    DEFAULT_REGISTER_REDIRECT,
    apiAuthPrefix,
    authRoutes1,
    authRoutes2,
} from '@/routes';
import { useEffect } from 'react';

export default function MyMiddleware() {
    const pathname = usePathname();
    const router = useRouter();
    const user = useStableQuery(api.users.getUser);

    const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
    // const isPublicRoute = publicRoutes.includes(pathname);
    const isAuthRoute1 = authRoutes1.includes(pathname);
    const isAuthRoute2 = authRoutes2.includes(pathname);
    const isDashboard = pathname.startsWith(DEFAULT_REGISTER_REDIRECT);
    const isPublicRoute = publicRoutes.some((route) =>
        pathname.startsWith(route)
    );

    useEffect(() => {
        if (user === undefined) return;

        const isLoggedIn = !!user;

        console.log('middleware:', user, isLoggedIn);

        if (isAuthRoute1) {
            if (isLoggedIn && user?.role !== undefined) {
                return router.push(DEFAULT_REGISTER_REDIRECT);
            } else if (isLoggedIn && user?.role === undefined) {
                return router.push(DEFAULT_LOGIN_REDIRECT);
            }
        }
        if (isDashboard) {
            if (!isLoggedIn) {
                return router.push('/login');
            } else if (isLoggedIn && user?.role === undefined) {
                return router.push(DEFAULT_LOGIN_REDIRECT);
            }
        }
        if (isAuthRoute2) {
            if (isLoggedIn && user?.role !== undefined) {
                return router.push(DEFAULT_REGISTER_REDIRECT);
            }

            if (!isLoggedIn) {
                return router.push('/login');
            }
        }
        if (!isLoggedIn && !isPublicRoute) {
            return router.push('/login');
        }
    }, [isAuthRoute1, isAuthRoute2, isDashboard, isPublicRoute, router, user]);

    return <></>;
}
