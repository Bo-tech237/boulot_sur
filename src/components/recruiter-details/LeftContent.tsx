import { Button } from '@/components/ui/button';
import { ShowRating } from '@/components/ui/showRating';
import { RecruiterDataType } from '@/types/recruiters';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
    recruiter: RecruiterDataType;
};

export default function LeftContent({ recruiter }: Props) {
    if (!recruiter) return;
    return (
        <div className="col-span-12 lg:col-span-4">
            <div className="border rounded">
                <div className="p-5 border-b">
                    <div className="text-center">
                        <Image
                            src={recruiter?.image || '/user.svg'}
                            height={100}
                            width={100}
                            alt=""
                            className="w-20 h-20 mx-auto rounded-full"
                        />
                        <h6 className="mt-4 mb-0 text-lg text-gray-900 dark:text-gray-50">
                            {recruiter.name}
                        </h6>

                        <ul className="flex justify-center gap-4">
                            <li className="h-10 w-10 text-center leading-[2.2] bg-gray-50 rounded-full text-lg text-gray-500 hover:text-white cursor-pointer transition-all duration-300 ease-in dark:bg-neutral-700 dark:text-white dark:hover:bg-violet-500/20">
                                <Link href="#" className="social-link">
                                    <i className="uil uil-twitter-alt"></i>
                                </Link>
                            </li>
                            <li className="h-10 w-10 text-center leading-[2.2] bg-gray-50 rounded-full text-lg text-gray-500 hover:text-white cursor-pointer transition-all duration-300 ease-in dark:bg-neutral-700 dark:text-white dark:hover:bg-violet-500/20">
                                <Link href="#" className="social-link">
                                    <i className="uil uil-whatsapp"></i>
                                </Link>
                            </li>
                            <li className="h-10 w-10 text-center leading-[2.2] bg-gray-50 rounded-full text-lg text-gray-500 hover:text-white cursor-pointer transition-all duration-300 ease-in dark:bg-neutral-700 dark:text-white dark:hover:bg-violet-500/20">
                                <Link href="#" className="social-link">
                                    <i className="uil uil-phone-alt"></i>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="p-5 border-b">
                    <h6 className="mb-5 font-semibold text-gray-900 text-17 dark:text-gray-50">
                        Profile Overview
                    </h6>

                    <ul className="space-y-4">
                        <li>
                            <div className="flex">
                                <label className="text-gray-900 w-[118px] font-medium dark:text-gray-50">
                                    Country
                                </label>
                                <div>
                                    <p className="mb-0 text-gray-500 dark:text-gray-300">
                                        {recruiter.country}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex">
                                <label className="text-gray-900 w-[118px] font-medium dark:text-gray-50">
                                    Location
                                </label>
                                <div>
                                    <p className="mb-0 text-gray-500 dark:text-gray-300">
                                        {recruiter.city}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex">
                                <label className="text-gray-900 w-[118px] font-medium dark:text-gray-50">
                                    Phone
                                </label>
                                <div>
                                    <p className="mb-0 text-gray-500 dark:text-gray-300">
                                        {recruiter.phone}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex">
                                <label className="text-gray-900 w-[118px] font-medium dark:text-gray-50">
                                    Email
                                </label>
                                <div>
                                    <p className="mb-0 text-gray-500 dark:text-gray-300">
                                        {recruiter.email}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <ul className="my-4">
                        <li>
                            <div className="flex">
                                <label className="text-gray-900 w-[118px] font-medium dark:text-gray-50">
                                    Role
                                </label>
                                <div>
                                    <p className="mb-0 uppercase text-gray-500 dark:text-gray-300">
                                        {recruiter.role}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div className="mt-8">
                        <Button className="w-full">
                            <Link
                                href={`/recruiters/${recruiter.userId}`}
                                className="flex items-center gap-2"
                            >
                                <span className="text-xl">Our Jobs</span>
                            </Link>
                        </Button>
                    </div>
                    <ul className="flex items-center justify-between mt-5">
                        {/* stars here */}
                        <ShowRating userRating={recruiter?.rating} />
                        {/* number here */}
                    </ul>
                </div>

                <div className="p-5">
                    <h6 className="mb-3 font-semibold text-gray-900 text-17 dark:text-gray-50">
                        Contact Details
                    </h6>
                    <ul>
                        <li>
                            <div className="flex items-center mt-4">
                                <div className="group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=sky]:bg-sky-500/20 group-data-[theme-color=red]:bg-red-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=pink]:bg-pink-500/20 group-data-[theme-color=blue]:bg-blue-500/20 h-11 w-11 text-xl text-center leading-[2.3] rounded-full group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
                                    <i className="uil uil-envelope-alt"></i>
                                </div>
                                <div className="ltr:ml-3 rtl:mr-3">
                                    <h6 className="mb-1 text-gray-900 text-14 dark:text-gray-50">
                                        Email
                                    </h6>
                                    <p className="text-gray-500 dark:text-gray-300">
                                        {recruiter.email}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mt-4">
                                <div className="group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=sky]:bg-sky-500/20 group-data-[theme-color=red]:bg-red-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=pink]:bg-pink-500/20 group-data-[theme-color=blue]:bg-blue-500/20 h-11 w-11 text-xl text-center leading-[2.3] rounded-full group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
                                    <i className="uil uil-map-marker"></i>
                                </div>
                                <div className="ltr:ml-3 rtl:mr-3">
                                    <h6 className="mb-1 text-gray-900 text-14 dark:text-gray-50">
                                        Address
                                    </h6>
                                    <p className="text-gray-500 dark:text-gray-300">
                                        {recruiter.city}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mt-4">
                                <div className="group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=sky]:bg-sky-500/20 group-data-[theme-color=red]:bg-red-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=pink]:bg-pink-500/20 group-data-[theme-color=blue]:bg-blue-500/20 h-11 w-11 text-xl text-center leading-[2.3] rounded-full group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
                                    <i className="uil uil-phone"></i>
                                </div>
                                <div className="ltr:ml-3 rtl:mr-3">
                                    <h6 className="mb-1 text-gray-900 text-14 dark:text-gray-50">
                                        Phone
                                    </h6>
                                    <p className="text-gray-500 dark:text-gray-300">
                                        {recruiter.phone}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mt-4">
                                <div className="group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=sky]:bg-sky-500/20 group-data-[theme-color=red]:bg-red-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=pink]:bg-pink-500/20 group-data-[theme-color=blue]:bg-blue-500/20 h-11 w-11 text-xl text-center leading-[2.3] rounded-full group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
                                    <i className="uil uil-skype-alt"></i>
                                </div>
                                <div className="ltr:ml-3 rtl:mr-3">
                                    <h6 className="mb-1 text-gray-900 text-14 dark:text-gray-50">
                                        Skype
                                    </h6>
                                    <p className="text-gray-500 dark:text-gray-300">
                                        @gabrielpalmer
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
