import { signIn } from '@/auth';
import React from 'react';
import { Button } from './ui/button';

export default async function SignIn() {
    return (
        <div>
            <form
                action={async () => {
                    'use server';
                    await signIn('google', { redirectTo: '/dashboard' });
                }}
            >
                <Button type="submit" className="w-full">
                    Sign In With Google
                </Button>
            </form>
        </div>
    );
}
