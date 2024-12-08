'use client';

import { api } from '../../../../../convex/_generated/api';
import LeftContent from '@/components/recruiter-details/LeftContent';
import RightContent from '@/components/recruiter-details/RightContent';
import DeleteRecruitersDialog from '@/components/DeleteRecruitersDialog ';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { Loader2 } from 'lucide-react';

function RecruiterProfile() {
    const { data, isPending, error } = useQuery(
        convexQuery(api.recruiters.getRecruiter, {})
    );

    if (isPending) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading Recruiter...
            </div>
        );
    }

    if (!data || !data.userId) {
        console.log('error:', error);
        return (
            <div className="flex py-10 items-center justify-center text-red-900 text-center">
                No recruiter available
            </div>
        );
    }

    return (
        <div className="w-full py-10">
            <div>
                <div className="flex flex-wrap gap-2 justify-between mb-5">
                    <DeleteRecruitersDialog id={data?.userId}>
                        <Button>Delete Account</Button>
                    </DeleteRecruitersDialog>

                    <Button asChild>
                        <Link
                            href={`/dashboard/recruiter/profile/${data?.userId}`}
                        >
                            Update Profile
                        </Link>
                    </Button>

                    <Button asChild>
                        <Link href={`/recruiter/${data?.userId}`}>
                            See Profile
                        </Link>
                    </Button>
                </div>
                <div className="grid grid-cols-12 gap-y-10 lg:gap-10">
                    <LeftContent recruiter={data} />
                    <RightContent recruiter={data} />
                </div>
            </div>
        </div>
    );
}

export default RecruiterProfile;
