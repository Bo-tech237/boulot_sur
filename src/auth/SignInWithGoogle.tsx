'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { GoogleLogo } from '@/components/GoogleLogo';
import { Button } from '@/components/ui/button';

export function SignInWithGoogle() {
    const { signIn } = useAuthActions();

    const redirect = '/dashboard';

    return (
        <Button
            className="w-full mb-5 mt-2"
            variant="outline"
            type="button"
            onClick={() => void signIn('google', { redirectTo: redirect })}
        >
            <GoogleLogo className="mr-2 h-4 w-4" /> Google
        </Button>
    );
}
