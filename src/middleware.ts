import { auth } from './auth';
import {
    publicRoutes,
    DEFAULT_LOGIN_REDIRECT,
    DEFAULT_REGISTER_REDIRECT,
    apiAuthPrefix,
    authRoutes1,
    authRoutes2,
} from './routes';

// export default auth((req) => {
//     if (!req.auth) {
//         const url = req.url.replace(req.nextUrl.pathname, '/');
//         return Response.redirect(url);
//     }
// });

export default auth((req) => {
    const { nextUrl } = req;
    const user = req.auth?.user;
    const isLoggedIn = !!req.auth;
    console.log('Route', nextUrl.pathname);
    console.log('Is LoggedIn', isLoggedIn);
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoute1 = authRoutes1.includes(nextUrl.pathname);
    const isAuthRoute2 = authRoutes2.includes(nextUrl.pathname);
    const isDashboard = DEFAULT_REGISTER_REDIRECT.includes(nextUrl.pathname);

    console.log(
        'Isapiroute:',
        isApiAuthRoute,
        'ispublic:',
        isPublicRoute,
        'isauthroute1',
        isAuthRoute1,
        'isauthroute2',
        isAuthRoute2
    );

    if (isApiAuthRoute) {
        return undefined;
    }

    if (isAuthRoute1) {
        if (isLoggedIn && user?.role !== 'user') {
            return Response.redirect(
                new URL(DEFAULT_REGISTER_REDIRECT, nextUrl)
            );
        } else if (isLoggedIn && user?.role === 'user') {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }

        return undefined;
    }

    if (isAuthRoute2) {
        if (isLoggedIn && user?.role !== 'user') {
            return Response.redirect(
                new URL(DEFAULT_REGISTER_REDIRECT, nextUrl)
            );
        }
    }

    if (!isLoggedIn && !isPublicRoute) {
        return Response.redirect(new URL('/login', nextUrl));
    }

    return undefined;
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
