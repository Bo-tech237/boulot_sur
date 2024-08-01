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
import MagicLinkAuth from './MagicLinkAuth';
import { Separator } from './ui/separator';
import { SignInWithGoogle } from '@/auth/SignInWithGoogle';
import { SignInMethodDivider } from '@/auth/SignInMethodDivider';

export default async function SignIn() {
    return (
        <div>
            <Card className="w-[350px] mx-auto bg-boulotGrey flex flex-col gap-5 p-4">
                <CardHeader>
                    <CardTitle>
                        <div className="flex items-center justify-center md:gap-12">
                            <Link className="" href="/">
                                <span className="sr-only">Home</span>
                                <Image
                                    src={'/logo-transparent.svg'}
                                    alt="logo"
                                    width={200}
                                    height={200}
                                    priority
                                />
                            </Link>
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <SignInWithGoogle />
                    <SignInMethodDivider />
                    <MagicLinkAuth />
                    <div className="pt-3">
                        <GoogleSignInError />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
