'use client';

import React from 'react';
import JobApplyDialog from '@/components/JobApplyDialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import H1 from '@/components/ui/h1';
import { formatMoney } from '@/lib/friendly-time';
import { Preloaded, usePreloadedQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

type Props = {
    preloadedJob: Preloaded<typeof api.jobs.getJobById>;
};

function JobDetail({ preloadedJob }: Props) {
    const job = usePreloadedQuery(preloadedJob);
    return (
        <div className="container">
            <div className="flex flex-col gap-5">
                <H1 className="uppercase">{job?.title}</H1>
                <div className="w-full flex flex-wrap gap-3 sm:gap-5">
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Max Applicants</span>
                        <p className="">{job?.maxApplicants}</p>
                    </div>
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Max Positions</span>
                        <p className="">{job?.maxPositions}</p>
                    </div>
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Location</span>
                        <p className="">{job?.location}</p>
                    </div>
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Salary</span>
                        <p className="">{formatMoney(job?.salary!)}</p>
                    </div>
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Applied</span>
                        <p className="">{job?.activeApplications}</p>
                    </div>
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Accepted</span>
                        <p className="">{job?.acceptedApplicants}</p>
                    </div>
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">JobType</span>
                        <p className="">{job?.type}</p>
                    </div>
                    <div className="bg-blue-500 w-32 h-16 rounded-lg flex flex-col items-center justify-center">
                        <span className="">Rating</span>
                        <p className="">{job?.rating}</p>
                    </div>
                </div>
                <div className="">
                    <h1 className="font-bold uppercase mb-3 text-2xl">
                        Skills
                    </h1>
                    <div className="flex gap-2">
                        {job?.skillsets.map((skill) => (
                            <Badge key={skill.id} className="p-2 capitalize">
                                {skill.text}
                            </Badge>
                        ))}
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
