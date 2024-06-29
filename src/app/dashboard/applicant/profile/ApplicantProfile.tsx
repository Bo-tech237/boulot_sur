'use client';

import { Session } from 'next-auth';
import React from 'react';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import DeleteApplicantsDialog from '@/components/DeleteApplicantsDialog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LeftContent from '@/components/applicant-details/LeftContent';
import RightContent from '@/components/applicant-details/RightContent';
import { usePathname } from 'next/navigation';
import { useStableQuery } from '@/hooks/useStableQuery';

type Props = {
    session: Session;
};

export default function ApplicantProfile({ session }: Props) {
    const pathName = usePathname();
    const applicant = useStableQuery(
        api.applicants.getApplicantById,
        session
            ? {
                  userId: session?.user.id as Id<'users'>,
              }
            : 'skip'
    );

    if (applicant === undefined) {
        return (
            <div className="flex py-5 items-center justify-center">
                Loading Applicant...
            </div>
        );
    }

    return (
        <div className="w-full py-5">
            <div>
                <div className="flex flex-wrap gap-1 justify-between mb-5">
                    <DeleteApplicantsDialog id={applicant?.userId!}>
                        <Button>Delete Profile</Button>
                    </DeleteApplicantsDialog>

                    <Button asChild>
                        <Link
                            href={`/dashboard/applicant/profile/${applicant?.userId}`}
                        >
                            Update Profile
                        </Link>
                    </Button>

                    <Button asChild>
                        <Link href={`/applicant/${applicant?.userId}`}>
                            See Profile
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-12 gap-y-10 lg:gap-10">
                    <LeftContent applicant={applicant} pathName={pathName} />
                    <RightContent applicant={applicant} />
                </div>
            </div>
        </div>
    );
}
