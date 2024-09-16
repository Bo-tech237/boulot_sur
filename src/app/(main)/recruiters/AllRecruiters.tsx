'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useStableQuery } from '@/hooks/useStableQuery';
import { FileStack, Loader2 } from 'lucide-react';
import { api } from '../../../../convex/_generated/api';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';

export default function AllRecruiters() {
    const { data, isPending, error } = useQuery(
        convexQuery(api.recruiters.getAllRecruiters, {})
    );

    // const recruitersWithUsers = useStableQuery(api.recruiters.getAllRecruiters);

    // if (recruitersWithUsers === undefined) {
    //     return (
    //         <div className="flex py-5 items-center justify-center">
    //             Loading Recruiters...
    //         </div>
    //     );
    // }

    return (
        <div>
            <div className="mx-auto max-w-screen-xl px-8 py-8 sm:px-6 sm:py-12 lg:py-16">
                <div className="mx-auto max-w-lg text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Browse All Recruiters
                    </h2>

                    <p className="mt-4 whitespace-pre-line">
                        Post a job to tell us about your project. We&apos;ll
                        quickly match you with the right freelancers.
                    </p>
                </div>

                <div className="flex flex-col gap-8 mt-8">
                    {isPending && (
                        <div className="flex gap-2 text-lg py-5 items-center justify-center">
                            <Loader2 size={50} className="animate-spin" />
                            Loading Recruiters...
                        </div>
                    )}

                    {data !== null &&
                        data?.map((recruiterWithUser) => (
                            <div
                                key={recruiterWithUser.recruiter._id}
                                className="transition-all duration-500 ease-in-out hover:-translate-y-2"
                            >
                                <Link
                                    href={`/recruiter/${recruiterWithUser.recruiter.userId}`}
                                >
                                    <Card className="">
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-center h-16 w-16 rounded-lg text-center leading-[4.4] mx-auto bg-red-950">
                                                <FileStack className="text-zinc-300" />
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex flex-col items-center">
                                            <h5 className="text-xl font-bold">
                                                Name:{' '}
                                                {recruiterWithUser?.user?.name}
                                            </h5>

                                            <p className="mt-1 font-medium">
                                                Country:{' '}
                                                {
                                                    recruiterWithUser.recruiter
                                                        .country
                                                }
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </div>
                        ))}
                    {data?.length === 0 && (
                        <div className="text-red-900 text-center text-2xl">
                            No recruiter availble
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
