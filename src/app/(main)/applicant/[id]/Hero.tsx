import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

export default function Hero() {
    return (
        <div className="container mx-auto">
            <div className="grid">
                <div className="col-span-12">
                    <div className="text-center">
                        <h3 className="mb-4 text-[26px]">Applicant Details</h3>
                        <div className="page-next">
                            <nav
                                className="inline-block"
                                aria-label="breadcrumb text-center"
                            >
                                <ol className="flex gap-1 items-center justify-center text-sm font-medium uppercase">
                                    <li>
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li className="flex gap-1 items-center justify-center">
                                        <ChevronRight size={20} />
                                        <Link href="/dashboard">Dashboard</Link>
                                    </li>
                                    <li
                                        className="flex gap-1 items-center justify-center"
                                        aria-current="page"
                                    >
                                        <ChevronRight size={20} />
                                        Details
                                    </li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
