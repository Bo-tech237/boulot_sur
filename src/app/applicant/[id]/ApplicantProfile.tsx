'use client';

import React from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import Hero from './Hero';
import LeftContent from '../../../components/applicant-details/LeftContent';
import RightContent from '../../../components/applicant-details/RightContent';
import { useStableQuery } from '@/hooks/useStableQuery';

export default function ApplicantProfile({ id }: { id: string }) {
    const applicant = useStableQuery(api.applicants.getApplicantById, {
        userId: id as Id<'users'>,
    });

    if (applicant === undefined) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading Applicant...
            </div>
        );
    }

    return (
        <div>
            <div>
                <section className="pt-44 pb-28 bg-violet-700 text-white dark:bg-neutral-900 bg-center bg-cover relative">
                    <Hero />
                </section>
                <section className="py-20">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-12 gap-y-10 lg:gap-10">
                            <LeftContent applicant={applicant} />
                            <RightContent applicant={applicant} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
