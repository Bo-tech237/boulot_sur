import { SignJWT, importPKCS8 } from 'jose';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { ConvexAdapter } from '../convex/ConvexAdapter';
import Nodemailer from 'next-auth/providers/nodemailer';

const CONVEX_SITE_URL = process.env.CONVEX_SITE_URL;

export const { handlers, signIn, signOut, auth } = NextAuth({
    trustHost: true,
    debug: true,
    theme: {
        logo: '/logo-transparent.png',
    },
    pages: {
        signIn: '/login',
    },
    providers: [Google],
    adapter: ConvexAdapter,
    callbacks: {
        async signIn({ user }) {
            if (user.role === undefined) {
                return '/login?error=Please you have to first register.';
            }

            return true;
        },
        async session({ session, user }) {
            const privateKey = await importPKCS8(
                process.env.CONVEX_AUTH_PRIVATE_KEY!,
                'RS256'
            );
            const role = user.role;
            const convexToken = await new SignJWT({
                sub: session.userId,
            })
                .setProtectedHeader({ alg: 'RS256' })
                .setIssuedAt()
                .setIssuer(CONVEX_SITE_URL)
                .setAudience('convex')
                .setExpirationTime('1h')
                .sign(privateKey);
            return { ...session, convexToken, role };
        },
    },
});

declare module 'next-auth' {
    interface Session {
        convexToken: string;
    }
}
