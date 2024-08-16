// env.d.ts

declare namespace NodeJS {
    interface ProcessEnv {
        GMAIL_USER: string;
        GMAIL_PASSWORD: string;
        NEXT_PUBLIC_CONVEX_URL: string;
        EMAIL_SERVER: string;
        EMAIL_FROM: string;
    }
}
