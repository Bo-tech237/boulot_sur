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

export default async function SignIn() {
    return (
        <div>
            <Card className="w-[350px] flex flex-col gap-5 p-5">
                <CardHeader>
                    <CardTitle>
                        <div className="md:flex md:items-center md:justify-center md:gap-12">
                            <Link
                                className="block bg-orange-50 rounded"
                                href="/"
                            >
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
                                await signIn('google', {
                                    redirectTo: '/dashboard',
                                });
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
                <CardFooter className="flex justify-end">
                    <Link className="text-sm" href={'/register'}>
                        Don&apos;t have an account?{' '}
                        <span className="underline text-blue-900">
                            Register
                        </span>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
