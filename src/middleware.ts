import { auth } from '../convex/auth';
import {
    publicRoutes,
    DEFAULT_LOGIN_REDIRECT,
    DEFAULT_REGISTER_REDIRECT,
    apiAuthPrefix,
    authRoutes1,
    authRoutes2,
} from './routes';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '../convex/_generated/api';

export async function middleware(req: NextRequest) {
    // const { nextUrl } = req;
    // const user = await fetchQuery(api.users.getUser);
    // const isLoggedIn = !!user;
    // const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    // // const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    // const isAuthRoute1 = authRoutes1.includes(nextUrl.pathname);
    // const isAuthRoute2 = authRoutes2.includes(nextUrl.pathname);
    // const isDashboard = nextUrl.pathname.startsWith(DEFAULT_REGISTER_REDIRECT);
    // const isPublicRoute = publicRoutes.some((route) =>
    //     nextUrl.pathname.startsWith(route)
    // );
    // if (user === undefined) return;
    // console.log('middleware:', user, isLoggedIn);
    // if (isApiAuthRoute) {
    //     return undefined;
    // }
    // if (isAuthRoute1) {
    //     if (isLoggedIn && user?.role !== null) {
    //         return Response.redirect(
    //             new URL(DEFAULT_REGISTER_REDIRECT, nextUrl)
    //         );
    //     } else if (isLoggedIn && user?.role === null) {
    //         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    //     }
    //     return undefined;
    // }
    // if (isDashboard) {
    //     if (!isLoggedIn) {
    //         return Response.redirect(new URL('/login', nextUrl));
    //     } else if (isLoggedIn && user?.role === 'user') {
    //         return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    //     }
    // }
    // if (isAuthRoute2) {
    //     if (isLoggedIn && user?.role !== 'user') {
    //         return Response.redirect(
    //             new URL(DEFAULT_REGISTER_REDIRECT, nextUrl)
    //         );
    //     }
    // }
    // if (!isLoggedIn && !isPublicRoute) {
    //     return Response.redirect(new URL('/login', nextUrl));
    // }
    // return undefined;
}

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
