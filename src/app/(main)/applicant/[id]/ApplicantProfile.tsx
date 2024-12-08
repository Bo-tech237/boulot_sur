'use client';

import React from 'react';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import Hero from './Hero';
import LeftContent from '@/components/applicant-details/LeftContent';
import RightContent from '@/components/applicant-details/RightContent';
import { useQuery } from '@tanstack/react-query';
import { convexQuery } from '@convex-dev/react-query';
import UserTestimonials from '@/components/UserTestimonials';
import { Loader2 } from 'lucide-react';

export default function ApplicantProfile({ id }: { id: string }) {
    const { data, isPending, error } = useQuery(
        convexQuery(api.comments.getApplicantReviews, {
            userId: id as Id<'users'>,
        })
    );

    if (isPending) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading Profile...
            </div>
        );
    }

    if (!data) {
        console.log('error', error);
        return (
            <div className="flex py-10 items-center justify-center">
                Profile not available
            </div>
        );
    }

    console.log('applicantReviews:', data);

    const { reviews, applicantWithFileUrl } = data;

    return (
        <div>
            <div>
                <section className="pt-44 pb-28 bg-violet-700 text-white dark:bg-red-900 bg-center bg-cover relative">
                    <Hero />
                </section>
                <section className="py-20">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-12 gap-y-10 lg:gap-10">
                            <LeftContent applicant={applicantWithFileUrl} />
                            <RightContent applicant={applicantWithFileUrl} />
                        </div>
                        <UserTestimonials reviews={reviews} />
                    </div>
                </section>
            </div>
        </div>
    );
}
