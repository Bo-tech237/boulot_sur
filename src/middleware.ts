import {
    convexAuthNextjsToken,
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '../convex/_generated/api';

const isLoginInPage = createRouteMatcher(['/login']);
const isRegisterPage = createRouteMatcher(['/register']);
const isDashboardPage = createRouteMatcher(['/dashboard']);
const isProtectedRoute = createRouteMatcher(['/register', '/dashboard(.*)']);

export default convexAuthNextjsMiddleware(async (request) => {
    const user = await fetchQuery(
        api.users.getUser,
        {},
        { token: convexAuthNextjsToken() }
    );

    console.log('test01', user);

    if (isLoginInPage(request) && isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, '/register');
    }

    if (isRegisterPage(request) && user?.role !== 'user') {
        return nextjsMiddlewareRedirect(request, '/dashboard');
    }

    if (isDashboardPage(request) && user?.role === 'user') {
        return nextjsMiddlewareRedirect(request, '/register');
    }

    if (isProtectedRoute(request) && !isAuthenticatedNextjs()) {
        return nextjsMiddlewareRedirect(request, '/login');
    }
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
