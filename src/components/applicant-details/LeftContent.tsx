import { Button } from '@/components/ui/button';
import { ShowRating } from '@/components/ui/showRating';
import { ApplicantDataType } from '@/types/applicant';
import { Download, Upload } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Badge } from '../ui/badge';
import UploadCVDialog from '../UpdateCVDialog';

type Props = {
    applicant: ApplicantDataType;
    pathName?: string;
};

export default function LeftContent({ applicant, pathName }: Props) {
    if (!applicant.skills) return;

    return (
        <div className="col-span-12 lg:col-span-4">
            <div className="border rounded">
                <div className="p-5 border-b">
                    <div className="text-center">
                        <Image
                            src={applicant.image! || '/user.svg'}
                            height={100}
                            width={100}
                            alt=""
                            className="w-20 h-20 mx-auto rounded-full"
                        />
                        <h6 className="mt-4 mb-0 text-lg text-gray-900 dark:text-gray-50">
                            {applicant.name}
                        </h6>
                        <p className="mb-4 uppercase flex gap-1 items-center justify-center">
                            {applicant?.skills.map((skill) => (
                                <Badge key={skill?.id}>{skill?.text}</Badge>
                            ))}
                        </p>
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
                    {applicant?.education!.map((edu, index) => (
                        <ul key={index} className="space-y-4">
                            <li>
                                <div className="flex">
                                    <label className="text-gray-900 w-[118px] font-medium dark:text-gray-50">
                                        Institution
                                    </label>
                                    <div>
                                        <p className="mb-0 text-gray-500 dark:text-gray-300">
                                            {edu.institutionName}
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex">
                                    <label className="text-gray-900 w-[118px] font-medium dark:text-gray-50">
                                        Start year
                                    </label>
                                    <div>
                                        <p className="mb-0 text-gray-500 dark:text-gray-300">
                                            {edu.startYear}
                                        </p>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex">
                                    <label className="text-gray-900 w-[118px] font-medium dark:text-gray-50">
                                        End year
                                    </label>
                                    <div>
                                        <p className="mb-0 text-gray-500 dark:text-gray-300">
                                            {edu.endYear}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    ))}

                    <ul className="my-4">
                        <li>
                            <div className="flex">
                                <label className="text-gray-900 w-[118px] font-medium dark:text-gray-50">
                                    Role
                                </label>
                                <div>
                                    <p className="mb-0 uppercase text-gray-500 dark:text-gray-300">
                                        {applicant.role}
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>

                    <div className="mt-8">
                        <Button className="w-full" asChild>
                            <Link
                                href={applicant?.fileUrl!}
                                locale={false}
                                rel="noopener noreferrer"
                                target="_blank"
                                aria-label="Download Resume"
                                className="flex items-center gap-2"
                            >
                                <Download />{' '}
                                <span className="text-xl">Download CV</span>
                            </Link>
                        </Button>
                    </div>

                    <div className="mt-8">
                        {pathName === '/dashboard/applicant/profile' && (
                            <UploadCVDialog>
                                <Button className="w-full">
                                    <div className="flex items-center gap-2">
                                        <Upload />{' '}
                                        <span className="text-xl">
                                            Update CV
                                        </span>
                                    </div>
                                </Button>
                            </UploadCVDialog>
                        )}
                    </div>
                    <ul className="flex items-center justify-between mt-5">
                        {/* stars here */}
                        <ShowRating userRating={applicant?.rating} />
                        {/* number here */}
                    </ul>
                </div>
                <div className="p-5 border-b">
                    <h6 className="mb-3 font-semibold">Professional Skills</h6>
                    <div className="flex flex-wrap gap-2 capitalize">
                        {applicant?.skills!.map((skill) => (
                            <Badge key={skill?.id}>{skill?.text}</Badge>
                        ))}
                    </div>
                </div>
                <div className="p-5 text-center">
                    <h6 className="mb-3 font-semibold text-gray-900 text-17 dark:text-gray-50">
                        Contact Details
                    </h6>
                    <ul>
                        <li>
                            <div className="flex items-center mt-4">
                                <div className="h-11 w-11 text-xl text-center leading-[2.3] rounded-full group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
                                    <i className="uil uil-envelope-alt"></i>
                                </div>
                                <div className="flex gap-2">
                                    <h6 className="mb-1 text-gray-900 text-14 dark:text-gray-50">
                                        Email
                                    </h6>
                                    <p className="text-gray-500 dark:text-gray-300">
                                        {applicant.email}
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mt-4">
                                <div className="group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=sky]:bg-sky-500/20 group-data-[theme-color=red]:bg-red-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=pink]:bg-pink-500/20 group-data-[theme-color=blue]:bg-blue-500/20 h-11 w-11 text-xl text-center leading-[2.3] rounded-full group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
                                    <i className="uil uil-map-marker"></i>
                                </div>
                                <div className="flex gap-2">
                                    <h6 className="mb-1 text-gray-900 text-14 dark:text-gray-50">
                                        Address
                                    </h6>
                                    <p className="text-gray-500 dark:text-gray-300">
                                        Dodge City, Louisiana
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mt-4">
                                <div className="group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=sky]:bg-sky-500/20 group-data-[theme-color=red]:bg-red-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=pink]:bg-pink-500/20 group-data-[theme-color=blue]:bg-blue-500/20 h-11 w-11 text-xl text-center leading-[2.3] rounded-full group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
                                    <i className="uil uil-phone"></i>
                                </div>
                                <div className="flex gap-2">
                                    <h6 className="mb-1 text-gray-900 text-14 dark:text-gray-50">
                                        Phone
                                    </h6>
                                    <p className="text-gray-500 dark:text-gray-300">
                                        +1(452) 125-6789
                                    </p>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center mt-4">
                                <div className="group-data-[theme-color=violet]:bg-violet-500/20 group-data-[theme-color=sky]:bg-sky-500/20 group-data-[theme-color=red]:bg-red-500/20 group-data-[theme-color=green]:bg-green-500/20 group-data-[theme-color=pink]:bg-pink-500/20 group-data-[theme-color=blue]:bg-blue-500/20 h-11 w-11 text-xl text-center leading-[2.3] rounded-full group-data-[theme-color=violet]:text-violet-500 group-data-[theme-color=sky]:text-sky-500 group-data-[theme-color=red]:text-red-500 group-data-[theme-color=green]:text-green-500 group-data-[theme-color=pink]:text-pink-500 group-data-[theme-color=blue]:text-blue-500">
                                    <i className="uil uil-skype-alt"></i>
                                </div>
                                <div className="flex gap-2">
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
