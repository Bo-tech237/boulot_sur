'use client';

import { api } from '../../../../../convex/_generated/api';
import LeftContent from '@/components/recruiter-details/LeftContent';
import RightContent from '@/components/recruiter-details/RightContent';
import DeleteRecruitersDialog from '@/components/DeleteRecruitersDialog ';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useStableQuery } from '@/hooks/useStableQuery';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import { Loader2 } from 'lucide-react';

function RecruiterProfile() {
    const { data, isPending, error } = useQuery(
        convexQuery(api.recruiters.getRecruiter, {})
    );

    // const recruiter = useStableQuery(api.recruiters.getRecruiter);

    // if (recruiter === undefined) {
    //     return (
    //         <div className="flex py-5 items-center justify-center">
    //             Loading Recruiter...
    //         </div>
    //     );
    // }

    // if (recruiter === null) return;

    return (
        <div className="w-full py-10">
            {isPending && (
                <div className="flex gap-2 text-lg py-5 items-center justify-center">
                    <Loader2 size={50} className="animate-spin" />
                    Loading Recruiter...
                </div>
            )}
            <div>
                <div className="flex flex-wrap gap-2 justify-between mb-5">
                    <DeleteRecruitersDialog id={data?.userId!}>
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
                    <LeftContent recruiter={data!} />
                    <RightContent recruiter={data!} />
                </div>
            </div>
        </div>
    );
}

export default RecruiterProfile;
