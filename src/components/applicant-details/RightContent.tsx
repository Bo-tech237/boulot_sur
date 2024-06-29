import { ApplicantDataType } from '@/types/applicant';
import React from 'react';

type Props = {
    applicant: ApplicantDataType;
};

export default function RightContent({ applicant }: Props) {
    return (
        <div className="col-span-12 lg:col-span-8">
            <div className="p-6 border rounded">
                <div>
                    <h6 className="mb-3 text-gray-900 text-17 dark:text-gray-50">
                        About Me
                    </h6>
                    <p className="mb-2 text-gray-500 dark:text-gray-300">
                        Very well thought out and articulate communication.
                        Clear milestones, deadlines and fast work. Patience.
                        Infinite patience. No shortcuts. Even if the client is
                        being careless. Some quick example text to build on the
                        card title and bulk the cards content Moltin gives you
                        platform.
                    </p>

                    <p className="mb-0 text-gray-500 dark:text-gray-300">
                        As a highly skilled and successfull product development
                        and design specialist with more than 4 Years of My
                        experience lies in successfully conceptualizing,
                        designing, and modifying consumer products specific to
                        interior design and home furnishings.
                    </p>
                </div>
                <div className="pt-5">
                    <h6 className="mb-0 text-gray-900 text-17 fw-bold dark:text-gray-50">
                        Education
                    </h6>
                    <div className="relative flex mt-4">
                        <div className="h-8 w-8 text-center leading-[2.2] group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=sky]:bg-sky-500/20 group-data-[theme-color=red]:bg-red-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=pink]:bg-pink-500/20 group-data-[theme-color=blue]:bg-blue-500/20 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500 shrink-0 rounded-full font-medium text-violet-500">
                            {' '}
                            B{' '}
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h6 className="mb-1 text-gray-900 text-16 dark:text-gray-50">
                                    BCA - Bachelor of Computer Applications
                                </h6>
                                <p className="mb-2 text-gray-500 dark:text-gray-300">
                                    International University - (2004 - 2010)
                                </p>
                                <p className="text-gray-500 dark:text-gray-300">
                                    There are many variations of passages of
                                    available, but the majority alteration in
                                    some form. As a highly skilled and
                                    successfull product development and design
                                    specialist with more than 4 Years of My
                                    experience.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="relative flex mt-8">
                        <div className="h-8 w-8 text-center leading-[2.2] shrink-0 rounded-full font-medium text-violet-500">
                            {' '}
                            M{' '}
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h6 className="mb-1 text-gray-900 text-16 dark:text-gray-50">
                                    MCA - Master of Computer Application
                                </h6>
                                <p className="mb-2 text-gray-500 dark:text-gray-300">
                                    International University - (2010 - 2012)
                                </p>
                                <p className="text-gray-500 dark:text-gray-300">
                                    There are many variations of passages of
                                    available, but the majority alteration in
                                    some form. As a highly skilled and
                                    successfull product development and design
                                    specialist with more than 4 Years of My
                                    experience.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-8">
                        <div className="h-8 w-8 text-center leading-[2.2] shrink-0 rounded-full font-medium text-violet-500">
                            {' '}
                            M{' '}
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h6 className="mb-1 text-gray-900 text-16 dark:text-gray-50">
                                    Design Communication Visual
                                </h6>
                                <p className="mb-2 text-gray-500 dark:text-gray-300">
                                    International University - (2012-2015)
                                </p>
                                <p className="text-gray-500 dark:text-gray-300">
                                    There are many variations of passages of
                                    available, but the majority alteration in
                                    some form. As a highly skilled and
                                    successfull product development and design
                                    specialist with more than 4 Years of My
                                    experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pt-10">
                    <h6 className="mb-0 text-gray-900 text-17 fw-bold dark:text-gray-50">
                        Experience
                    </h6>
                    <div className="relative flex mt-4">
                        <div className="h-8 w-8 text-center leading-[2.2] shrink-0 rounded-full font-medium text-violet-500">
                            {' '}
                            W{' '}
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h6 className="mb-1 text-gray-900 text-16 dark:text-gray-50">
                                    Web Design &amp; Development Team Leader
                                </h6>
                                <p className="mb-2 text-gray-500 dark:text-gray-300">
                                    Creative Agency - (2013 - 2016)
                                </p>
                                <p className="text-gray-500 dark:text-gray-300">
                                    There are many variations of passages of
                                    available, but the majority alteration in
                                    some form. As a highly skilled and
                                    successfull product development and design
                                    specialist with more than 4 Years of My
                                    experience.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex mt-8">
                        <div className="h-8 w-8 text-center leading-[2.2] group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=sky]:bg-sky-500/20 group-data-[theme-color=red]:bg-red-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=pink]:bg-pink-500/20 group-data-[theme-color=blue]:bg-blue-500/20 group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500 shrink-0 rounded-full font-medium text-violet-500">
                            {' '}
                            P{' '}
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h6 className="mb-1 text-gray-900 text-16 dark:text-gray-50">
                                    Project Manager
                                </h6>
                                <p className="mb-2 text-gray-500 dark:text-gray-300">
                                    Jobcy Technology Pvt.Ltd - (Pressent)
                                </p>
                                <p className="text-gray-500 dark:text-gray-300">
                                    There are many variations of passages of
                                    available, but the majority alteration in
                                    some form. As a highly skilled and
                                    successfull product development and design
                                    specialist with more than 4 Years of My
                                    experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
