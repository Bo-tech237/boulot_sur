export const publicRoutes = [
    '/',
    '/jobs/:path*',
    '/services',
    '/contact',
    '/faqs',
    '/categories/:path*',
    '/recruiter/:path*',
];

export const authRoutes1 = ['/login'];

export const authRoutes2 = ['/register'];

export const apiAuthPrefix = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT = '/register';

export const DEFAULT_REGISTER_REDIRECT = '/dashboard';
