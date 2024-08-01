'use client';

import { api } from '../../../../../convex/_generated/api';
import LeftContent from '@/components/recruiter-details/LeftContent';
import RightContent from '@/components/recruiter-details/RightContent';
import DeleteRecruitersDialog from '@/components/DeleteRecruitersDialog ';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useStableQuery } from '@/hooks/useStableQuery';

function RecruiterProfile() {
    const recruiter = useStableQuery(api.recruiters.getRecruiter);

    if (recruiter === undefined) {
        return (
            <div className="flex py-5 items-center justify-center">
                Loading Recruiter...
            </div>
        );
    }

    if (recruiter === null) return;

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
