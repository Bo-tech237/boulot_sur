'use client';

import React from 'react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import Hero from './Hero';
import LeftContent from '../../../components/recruiter-details/LeftContent';
import RightContent from '../../../components/recruiter-details/RightContent';
import { useStableQuery } from '@/hooks/useStableQuery';

export default function RecruiterProfile({ id }: { id: string }) {
    const recruiter = useStableQuery(api.recruiters.getRecruiterById, {
        userId: id as Id<'users'>,
    });

    if (recruiter === undefined) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading Recruiter...
            </div>
        );
    }

    return (
        <div>
            <div>
                <section className="pt-44 pb-28 bg-violet-700 text-white bg-center bg-cover relative">
                    <Hero />
                </section>
                <section className="py-20">
                    <div className="container mx-auto">
                        <div className="grid grid-cols-12 gap-y-10 lg:gap-10">
                            <LeftContent recruiter={recruiter} />
                            <RightContent recruiter={recruiter} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
