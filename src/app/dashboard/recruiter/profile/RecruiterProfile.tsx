'use client';

import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import LeftContent from '@/components/recruiter-details/LeftContent';
import RightContent from '@/components/recruiter-details/RightContent';
import DeleteRecruitersDialog from '@/components/DeleteRecruitersDialog ';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Session } from 'next-auth';
import { useStableQuery } from '@/hooks/useStableQuery';

type Props = {
    session: Session;
};

function RecruiterProfile({ session }: Props) {
    const recruiter = useStableQuery(api.recruiters.getRecruiterById, {
        userId: session?.user.id as Id<'users'>,
    });

    if (recruiter === undefined) {
        return (
            <div className="flex py-5 items-center justify-center">
                Loading Recruiter...
            </div>
        );
    }

    return (
        <div className="w-full py-10">
            <div>
                <div className="flex flex-wrap gap-2 justify-between mb-5">
                    <DeleteRecruitersDialog id={recruiter?.userId!}>
                        <Button>Delete Account</Button>
                    </DeleteRecruitersDialog>

                    <Button asChild>
                        <Link
                            href={`/dashboard/recruiter/profile/${recruiter?.userId}`}
                        >
                            Update Profile
                        </Link>
                    </Button>

                    <Button asChild>
                        <Link href={`/recruiter/${recruiter?.userId}`}>
                            See Profile
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-12 gap-y-10 lg:gap-10">
                    <LeftContent recruiter={recruiter} />
                    <RightContent recruiter={recruiter} />
                </div>
            </div>
        </div>
    );
}

export default RecruiterProfile;
