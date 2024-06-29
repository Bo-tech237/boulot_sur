// env.d.ts

declare namespace NodeJS {
    interface ProcessEnv {
        AUTH_GOOGLE_ID: string;
        AUTH_GOOGLE_SECRET: string;
        AUTH_SECRET: string;
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: string;
        NEXT_PUBLIC_CONVEX_URL: string;
        CONVEX_AUTH_ADAPTER_SECRET: string;
        CONVEX_DEPLOYMENT: string;
        CONVEX_AUTH_PRIVATE_KEY: string;
        CONVEX_SITE_URL: string;
        JWKS: string;
        CLIENT_ORIGIN: string;
        EMAIL_SERVER: string;
        EMAIL_FROM: string;
    }
}
