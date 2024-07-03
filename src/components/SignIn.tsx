import { signIn } from '@/auth';
import React from 'react';
import { Button } from './ui/button';
import GoogleSignInError from '@/app/login/GoogleSignInError';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import getSession from '@/lib/getSession';

export default async function SignIn() {
    const session = await getSession();
    const redirect = '/register';

    if (session) return;

    return (
        <div>
            <Card className="w-[350px] flex flex-col gap-5 p-5">
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center justify-center md:gap-12">
                            <Link className="bg-zinc-100 rounded" href="/">
                                <span className="sr-only">Home</span>
                                <Image
                                    src={'/logo-transparent.png'}
                                    alt="Boulot Sur"
                                    width={150}
                                    height={150}
                                    priority
                                />
                            </Link>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <form
                            action={async () => {
                                'use server';
                                await signIn(
                                    'google',

                                    {
                                        redirectTo: `${redirect}`,
                                    }
                                );
                            }}
                        >
                            <Button type="submit" className="w-full">
                                Sign In With Google
                            </Button>
                            <div className="pt-3">
                                <GoogleSignInError />
                            </div>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
