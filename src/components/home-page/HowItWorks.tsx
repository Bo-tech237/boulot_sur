import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function HowItWorks() {
    return (
        <section className="py-20 bg-neutral-800">
            <div className="container mx-auto">
                <div className="nav-tabs round-pill">
                    <div className="grid items-center grid-cols-12 gap-5">
                        <div className="col-span-12 lg:col-span-6">
                            <h3 className="mb-3 text-3xl text-gray-50">
                                How It Works
                            </h3>
                            <p className="text-gray-300">
                                Post a job to tell us about your project.
                                We&apos;ll quickly match you with the right
                                freelancers.
                            </p>

                            <div className="mt-5">
                                <ul className="text-gray-700 nav">
                                    <li className="w-full mb-[22px]">
                                        <Link
                                            href="/login"
                                            className="relative inline-block w-full p-2"
                                        >
                                            <div className="flex gap-2">
                                                <div className="shrink-0 h-10 w-10 rounded-full text-center bg-gray-500/20 group-[.active]:group-data-[theme-color=violet]:bg-violet-500 group-data-[theme-color=sky]:group-[.active]:bg-sky-500 group-data-[theme-color=red]:group-[.active]:bg-red-500 group-data-[theme-color=green]:group-[.active]:bg-green-500 group-data-[theme-color=pink]:group-[.active]:bg-pink-500 group-data-[theme-color=blue]:group-[.active]:bg-blue-500">
                                                    <span className=" group-[.active]:text-white text-16 leading-[2.5] text-gray-50">
                                                        1
                                                    </span>
                                                </div>
                                                <div className="grow">
                                                    <h5 className="text-lg text-gray-50">
                                                        Register an account
                                                    </h5>
                                                    <p className="mt-1 mb-2 text-gray-300">
                                                        Due to its widespread
                                                        use as filler text for
                                                        layouts, non-readability
                                                        is of great importance.
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="w-full mb-[22px]">
                                        <Link
                                            href="/jobs"
                                            className="relative inline-block w-full p-2 group"
                                        >
                                            <div className="flex gap-2">
                                                <div className="shrink-0 h-10 w-10 rounded-full text-center bg-gray-500/20">
                                                    <span className="group-[.active]:text-white text-16 leading-[2.5] text-gray-50">
                                                        2
                                                    </span>
                                                </div>
                                                <div className="grow ">
                                                    <h5 className="text-lg text-gray-50">
                                                        Find your job
                                                    </h5>
                                                    <p className="mt-1 mb-2 text-gray-400">
                                                        There are many
                                                        variations of passages
                                                        of avaibookmark-label,
                                                        but the majority
                                                        alteration in some form.
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                    <li className="w-full mb-[22px]">
                                        <Link
                                            href="/jobs"
                                            className="relative inline-block w-full p-2 group"
                                        >
                                            <div className="flex gap-2">
                                                <div className="shrink-0 h-10 w-10 rounded-full text-center bg-gray-500/20">
                                                    <span className="text-16 leading-[2.5] text-gray-50">
                                                        3
                                                    </span>
                                                </div>
                                                <div className="grow">
                                                    <h5 className="text-lg text-gray-50">
                                                        Apply for job
                                                    </h5>
                                                    <p className="mt-1 mb-2 text-gray-400">
                                                        It is a long established
                                                        fact that a reader will
                                                        be distracted by the
                                                        readable content of a
                                                        page.
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className="tab-content">
                                <Image
                                    src={'/how-it-works.svg'}
                                    width={700}
                                    height={700}
                                    alt="How it works"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
