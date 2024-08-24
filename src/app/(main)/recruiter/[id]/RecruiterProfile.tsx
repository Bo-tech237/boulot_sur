'use client';

import React from 'react';
import { Id } from '../../../../../convex/_generated/dataModel';
import Hero from './Hero';
import LeftContent from '@/components/recruiter-details/LeftContent';
import RightContent from '@/components/recruiter-details/RightContent';
import { useStableQuery } from '@/hooks/useStableQuery';
import UserTestimonials from '@/components/UserTestimonials';
import { api } from '../../../../../convex/_generated/api';

export default function RecruiterProfile({ id }: { id: string }) {
    const recruiter = useStableQuery(api.recruiters.getRecruiterById, {
        userId: id as Id<'users'>,
    });
    const recruiterReviews = useStableQuery(api.comments.getRecruiterReviews, {
        userId: id as Id<'users'>,
    });

    if (recruiter === undefined) {
        return (
            <div className="flex py-10 items-center justify-center">
                Loading Recruiter...
            </div>
        );
    }

    if (recruiterReviews === undefined) {
        return (
            <div className="flex py-10 items-center justify-center">
                Loading Reviews...
            </div>
        );
    }

    console.log('recruiterReviews:', recruiterReviews);

    return (
        <div>
            <div>
                <section className="pt-44 pb-28 bg-red-900 text-white bg-center bg-cover relative">
                    <Hero />
                </section>
                <section className="py-20">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-12 gap-y-10 lg:gap-10">
                            <LeftContent recruiter={recruiter!} />
                            <RightContent recruiter={recruiter!} />
                        </div>
                        <UserTestimonials reviews={recruiterReviews} />
                    </div>
                </section>
            </div>
        </div>
    );
}
