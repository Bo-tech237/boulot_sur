import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,    
    nextjsMiddlewareRedirect,
} from '@convex-dev/auth/nextjs/server';
import { fetchQuery } from 'convex/nextjs';
import { api } from '../convex/_generated/api';

const isLoginPage = createRouteMatcher(['/login']);
const isRegisterPage = createRouteMatcher(['/register']);
const isDashboardPage = createRouteMatcher(['/dashboard']);
const isProtectedRoute = createRouteMatcher(['/register', '/dashboard(.*)']);

export default convexAuthNextjsMiddleware(async (request,{convexAuth}) => {
    //const isAuthenticated = await convexAuth.isAuthenticated();
    const user = await fetchQuery(
        api.users.getUser,
        {},
        { token: await convexAuth.getToken() }
    );

    console.log('testAuth:',await convexAuth.isAuthenticated())

    // 1. User not authenticated
    if (!await convexAuth.isAuthenticated() || !user) {
        if (isProtectedRoute(request)) {
            return nextjsMiddlewareRedirect(request, '/login');
        }
        return; // Allow access to non-protected routes
    }

    const userRoles = user?.roles || [];
    const hasUserRole = userRoles.length === 1;
    const hasAdditionalRoles = userRoles.length > 1;

    if (isLoginPage(request) && await convexAuth.isAuthenticated()) {
        return nextjsMiddlewareRedirect(request, '/register');
    }

    if (isRegisterPage(request) && hasAdditionalRoles) {
        return nextjsMiddlewareRedirect(request, '/dashboard');
    }

    if (isDashboardPage(request) && hasUserRole) {
        return nextjsMiddlewareRedirect(request, '/register');
    }
},{cookieConfig:{maxAge: 60 * 60 * 24 * 30}});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
