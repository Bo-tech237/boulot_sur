import React from 'react';
import { jobApiTypes } from '@/lib/jobSchema';
import JobDetail from './JobDetail';
import { Metadata } from 'next';
import { preloadQuery } from 'convex/nextjs';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';

type PageProps = { params: { id: string } };

// export async function generateStaticParams() {
//     const jobs = await preloadQuery(api.jobs.getJobs);
//     return jobs.map((job) => ({ id: job?._id }));
// }

// export async function generateMetadata({
//     params: { id },
// }: PageProps): Promise<Metadata> {
//     const job: jobApiTypes = await getJobById(id);
//     return { title: job.title };
// }

export default async function SingleJobPage({ params: { id } }: PageProps) {
    const preloadedJob = await preloadQuery(api.jobs.getJobById, {
        jobId: id as Id<'jobs'>,
    });

    console.log('jobDetailtest:', preloadedJob);
    return (
        <div className="my-10">
            <JobDetail preloadedJob={preloadedJob} />
        </div>
    );
}
