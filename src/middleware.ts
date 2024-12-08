import {
    convexAuthNextjsToken,
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '../convex/_generated/api';

const isLoginPage = createRouteMatcher(['/login']);
const isRegisterPage = createRouteMatcher(['/register']);
const isDashboardPage = createRouteMatcher(['/dashboard']);
const isProtectedRoute = createRouteMatcher(['/register', '/dashboard(.*)']);

export default convexAuthNextjsMiddleware(async (request) => {
    const user = await fetchQuery(
        api.users.getUser,
        {},
        { token: await convexAuthNextjsToken() }
    );

    // 1. User not authenticated
    if (!(await isAuthenticatedNextjs()) || user === null) {
        if (isProtectedRoute(request)) {
            return nextjsMiddlewareRedirect(request, '/login');
        }
        return; // Allow access to non-protected routes
    }

    const userRoles = user?.roles || [];
    const hasUserRole = userRoles.length === 1;
    const hasAdditionalRoles = userRoles.length > 1;

    if (isLoginPage(request) && (await isAuthenticatedNextjs())) {
        return nextjsMiddlewareRedirect(request, '/register');
    }

    if (isRegisterPage(request) && hasAdditionalRoles) {
        return nextjsMiddlewareRedirect(request, '/dashboard');
    }

    if (isDashboardPage(request) && hasUserRole) {
        return nextjsMiddlewareRedirect(request, '/register');
    }
});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
