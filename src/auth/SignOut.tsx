'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { LogOut } from 'lucide-react';

export function SignOut() {
    const { signOut } = useAuthActions();
    return (
        <button
            className="flex w-full items-center"
            onClick={() => void signOut()}
        >
            <LogOut className="mr-2 h-4 w-4" /> Sign Out
        </button>
    );
}
