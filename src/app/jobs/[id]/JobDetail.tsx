'use client';

import React from 'react';
import JobApplyDialog from '@/components/JobApplyDialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import H1 from '@/components/ui/h1';
import { formatMoney } from '@/lib/friendly-time';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { useStableQuery } from '@/hooks/useStableQuery';
import { Loader2 } from 'lucide-react';

type Props = {
    id: string;
};

function JobDetail({ id }: Props) {
    const job = useStableQuery(api.jobs.getJobById, {
        jobId: id as Id<'jobs'>,
    });

    if (job === undefined) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading Job Detail...
            </div>
        );
    }

    return (
        <div className="container mx-auto">
            <div className="flex flex-col gap-5">
                <H1 className="uppercase">{job?.title}</H1>
                <div className="w-full flex flex-wrap gap-2 justify-between">
                    <div className="bg-boulotRed w-32 text-white h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Max Applicants</span>
                        <p className="">{job?.maxApplicants}</p>
                    </div>
                    <div className="bg-boulotRed w-32 text-white h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Max Positions</span>
                        <p className="">{job?.maxPositions}</p>
                    </div>
                    <div className="bg-boulotRed w-32 text-white h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Location</span>
                        <p className="">{job?.location}</p>
                    </div>
                    <div className="bg-boulotRed w-32 text-white h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Salary</span>
                        <p className="">{formatMoney(job?.salary!)}</p>
                    </div>
                    <div className="bg-boulotRed w-32 text-white h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Applied</span>
                        <p className="">{job?.activeApplications}</p>
                    </div>
                    <div className="bg-boulotRed w-32 text-white h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Accepted</span>
                        <p className="">{job?.acceptedApplicants}</p>
                    </div>
                    <div className="bg-boulotRed w-32 text-white h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">JobType</span>
                        <p className="">{job?.type}</p>
                    </div>
                    <div className="bg-boulotRed w-32 text-white h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Rating</span>
                        <p className="">{job?.rating}</p>
                    </div>
                </div>
                <div className="flex gap-5 items-center justify-between">
                    <div className="">
                        <h1 className="font-bold uppercase mb-3 text-2xl">
                            Skills
                        </h1>
                        <div className="flex gap-2">
                            {job?.skillsets.map((skill) => (
                                <Badge
                                    key={skill.id}
                                    className="p-2 capitalize"
                                >
                                    {skill.text}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h1 className="font-bold uppercase mb-3 text-2xl">
                            Category
                        </h1>
                        <p className="flex justify-end">
                            <Badge className="p-2 capitalize">
                                {job?.category}
                            </Badge>
                        </p>
                    </div>
                </div>

                {job && (
                    <div
                        className="ProseMirror whitespace-pre-line py-4"
                        style={{ whiteSpace: 'pre-line' }}
                        dangerouslySetInnerHTML={{ __html: job?.description }}
                    />
                )}
                <div className="flex justify-between items-center gap-1">
                    <JobApplyDialog jobId={job?._id!} />
                    <Button>
                        <Link href="/jobs">Back to Jobs</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default JobDetail;
