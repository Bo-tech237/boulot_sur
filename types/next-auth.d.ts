import { DefaultSession } from 'next-auth';
import { JWT, DefaultJWT } from '@auth/core/jwt';

declare module 'next-auth' {
    interface Session {
        user: { role: string } & DefaultSession['user'];
    }

    interface User {
        role: string | null;
    }
}

declare module '@auth/core/jwt' {
    interface JWT extends DefaultJWT {
        role: string;
    }
}
