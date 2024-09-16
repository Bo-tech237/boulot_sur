'use client';

import React from 'react';
import { api } from '../../../../../convex/_generated/api';
import DeleteApplicantsDialog from '@/components/DeleteApplicantsDialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LeftContent from '@/components/applicant-details/LeftContent';
import RightContent from '@/components/applicant-details/RightContent';
import { usePathname } from 'next/navigation';
import { useStableQuery } from '@/hooks/useStableQuery';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { Loader2 } from 'lucide-react';

export default function ApplicantProfile() {
    const pathName = usePathname();
    const { data, isPending, error } = useQuery(
        convexQuery(api.applicants.getApplicant, {})
    );
    // const applicant = useStableQuery(api.applicants.getApplicant);

    // if (applicant === undefined) {
    //     return (
    //         <div className="flex py-5 items-center justify-center">
    //             Loading Applicant...
    //         </div>
    //     );
    // }

    return (
        <div className="w-full py-5">
            {isPending && (
                <div className="flex gap-2 text-lg py-5 items-center justify-center">
                    <Loader2 size={50} className="animate-spin" />
                    Loading Applicant...
                </div>
            )}
            <div>
                <div className="flex flex-wrap gap-1 justify-between mb-5">
                    <DeleteApplicantsDialog id={data?.userId!}>
                        <Button>Delete Profile</Button>
                    </DeleteApplicantsDialog>

                    <Button asChild>
                        <Link
                            href={`/dashboard/applicant/profile/${data?.userId}`}
                        >
                            Update Profile
                        </Link>
                    </Button>

                    <Button asChild>
                        <Link href={`/applicant/${data?.userId}`}>
                            See Profile
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-12 gap-y-10 lg:gap-10">
                    <LeftContent applicant={data!} pathName={pathName} />
                    <RightContent applicant={data!} />
                </div>
            </div>
        </div>
    );
}
