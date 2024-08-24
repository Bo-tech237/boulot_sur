'use client';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { formatMoney, relativeDate } from '@/lib/friendly-time';
import { ShowRating } from '@/components/ui/showRating';
import { Doc } from '../../../../convex/_generated/dataModel';

type Props = { job: Doc<'jobs'> };

function JobCard({ job }: Props) {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="uppercase">{job.title}</CardTitle>
                </CardHeader>
                <CardContent className="">
                    <p>Max applications: {job.maxApplicants}</p>
                    <p>Max positions: {job.maxPositions}</p>
                    <p className="capitalize">Location: {job.location}</p>
                    <p>Salary: {formatMoney(job.salary)}</p>
                    <p>Posted: {relativeDate(new Date(job._creationTime))}</p>
                    <p>
                        Skills:{' '}
                        {job.skillsets.map(
                            (skillset: { text: any }, index: number) =>
                                `${index < 2 ? skillset.text : ''} ${
                                    job.skillsets?.length > 1 && index < 1
                                        ? ','
                                        : ''
                                } `
                        )}
                    </p>
                    <p>JobType: {job.type}</p>

                    <p>
                        <ShowRating userRating={job.rating} />
                    </p>
                </CardContent>
                <CardFooter>
                    <Button>
                        <Link className="flex gap-2" href={`/jobs/${job._id}`}>
                            View more <ArrowRight />
                        </Link>
                    </Button>
                </CardFooter>
            </Card>
        </>
    );
}

export default JobCard;
