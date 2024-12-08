'use client';

import { footerInfos } from '@/constants/data';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function Footer() {
    return (
        <div>
            <footer className="bg-boulotGrey">
                <div className="mx-auto max-w-screen-xl py-16">
                    <div className="flex flex-col items-center gap-4 rounded-lg bg-boulotRed p-6 shadow-lg sm:flex-row sm:justify-between">
                        <strong className="text-xl text-white sm:text-xl">
                            Make Your Next Career Move!
                        </strong>

                        <Link
                            className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-red-900 hover:bg-transparent hover:text-white focus:outline-none focus:ring active:bg-white/90"
                            href="/login"
                        >
                            <span className="text-sm font-medium">
                                Let&apos;s Get Started
                            </span>

                            <ArrowRight size={20} />
                        </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-2">
                        {footerInfos.map((footerInfo, index) => (
                            <div
                                key={index}
                                className="text-center sm:text-left flex flex-col justify-center items-center"
                            >
                                <p className="text-lg text-white font-medium">
                                    {footerInfo.title}
                                </p>

                                {footerInfo.list.map((footerList) => (
                                    <ul
                                        key={footerList.name}
                                        className="mt-8 space-y-4 text-sm"
                                    >
                                        <li>
                                            <Link
                                                className="text-white transition-all duration-500 ease-in-out hover:text-base"
                                                href={footerList.href}
                                            >
                                                {footerList.name}
                                            </Link>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        ))}
                    </div>

                    <div className="mt-16">
                        <div className="mt-16 sm:flex sm:items-center sm:justify-between">
                            <div className="flex justify-center sm:justify-start">
                                <Link className="block" href="/">
                                    <span className="sr-only">Home</span>
                                    <Image
                                        src={'/logo-transparent.svg'}
                                        alt="Boulot Sur"
                                        width={150}
                                        height={150}
                                        priority
                                    />
                                </Link>
                            </div>

                            <p className="mt-4 text-center text-sm text-white sm:mt-0 sm:text-right">
                                Copyright &copy; {new Date().getFullYear()}. All
                                rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
