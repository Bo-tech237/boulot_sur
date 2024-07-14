import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import H1 from '../ui/h1';
import { Separator } from '@/components/ui/separator';

export default function HowItWorks() {
    return (
        <section className="py-20 bg-boulotGrey">
            <div className="container">
                <div className="">
                    <div className="">
                        <div className="">
                            <H1 className="mb-3 text-gray-50">How It Works</H1>
                            <p className="text-gray-100">
                                Post a job to tell us about your project.
                                We&apos;ll quickly match you with the right
                                freelancers.
                            </p>

                            <div className="mt-5 col-span-12">
                                <ul className="text-gray-100 flex flex-col gap-5 items-center justify-center">
                                    <li className="w-full mb-[22px]">
                                        <Link
                                            href="/login"
                                            className="relative inline-block w-full p-2"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="">
                                                    <span className="text-5xl font-bold leading-[2.5] text-black">
                                                        1
                                                    </span>
                                                </div>
                                                <div className="grow text-center">
                                                    <h5 className="text-lg font-bold text-gray-50">
                                                        Create profile
                                                    </h5>
                                                    <p className="mt-5 mb-2 text-gray-200">
                                                        Set up your job seeker
                                                        profile with your
                                                        details.
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <Separator className="my-5 bg-gray-50" />
                                    <li className="w-full mb-[22px]">
                                        <Link
                                            href="/jobs"
                                            className="relative inline-block w-full p-2 group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="">
                                                    <span className="text-5xl font-bold leading-[2.5] text-black">
                                                        2
                                                    </span>
                                                </div>
                                                <div className="grow text-center">
                                                    <h5 className="text-lg font-bold text-gray-50">
                                                        Browse Jobs
                                                    </h5>
                                                    <p className="mt-5 mb-2 text-gray-200">
                                                        Search through various
                                                        job listings.
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <Separator className="my-5 bg-gray-50" />
                                    <li className="w-full mb-[22px]">
                                        <Link
                                            href="/jobs"
                                            className="relative inline-block w-full p-2 group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="">
                                                    <span className="text-5xl font-bold leading-[2.5] text-black">
                                                        3
                                                    </span>
                                                </div>
                                                <div className="grow text-center">
                                                    <h5 className="text-lg font-bold text-gray-50">
                                                        Apply Easily
                                                    </h5>
                                                    <p className="mt-5 mb-2 text-gray-200">
                                                        Submit applications with
                                                        a simple click.
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
