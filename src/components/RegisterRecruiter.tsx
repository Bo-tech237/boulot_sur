/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useRecruiterMultistepForm } from '@/hooks/useRecruiterMultistepForm';
import Link from 'next/link';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from './ui/use-toast';
import { recruiterSchema, recruiterTypes } from '@/lib/recruiterSchema';
import RecruiterAddressForm from '@/app/dashboard/recruiter/RecruiterAddressForm';
import RecruiterDescriptionForm from '@/app/dashboard/recruiter/RecruiterDescriptionForm';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { RecruiterDataType } from '@/types/recruiters';
import { Progress } from '@/components/ui/progress';

type Props = { recruiter?: RecruiterDataType | null };

function RegisterRecruiter({ recruiter }: Props) {
    const createRecruiter = useMutation(api.recruiters.createRecruiter);
    const updateRecruiter = useMutation(api.recruiters.updateRecruiter);

    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<recruiterTypes>({
        resolver: zodResolver(recruiterSchema),
        defaultValues: {
            phone: recruiter?.phone,
            country: recruiter?.country,
            city: recruiter?.city,
            description: recruiter?.description,
        },
    });

    const {
        steps,
        currentStepIndex,
        step,
        isFirstStep,
        isLastStep,
        back,
        next,
    } = useRecruiterMultistepForm([
        <RecruiterAddressForm {...form} />,
        <RecruiterDescriptionForm {...form} />,
    ]);

    async function onSubmit(data: recruiterTypes) {
        if (recruiter) {
            const updatedRecruiter = await updateRecruiter({
                recruiterId: recruiter?._id as Id<'recruiters'>,
                phone: data.phone,
                country: data.country,
                city: data.city,
                description: data.description,
            });

            if (updatedRecruiter?.success === false) {
                return form.setError('root', {
                    message: updatedRecruiter.message,
                });
            }

            if (updatedRecruiter?.success === true) {
                toast({
                    variant: 'success',
                    title: updatedRecruiter.message,
                    description: `${new Date().toLocaleDateString()}`,
                });

                return router.push('/dashboard/recruiter/profile');
            }
        } else {
            const result = await createRecruiter({
                phone: data.phone,
                country: data.country,
                city: data.city,
                description: data.description,
            });

            if (result?.success === false) {
                return form.setError('root', { message: result.message });
            }

            if (result?.success === true) {
                toast({
                    variant: 'success',
                    title: result.message,
                    description: `${new Date()}`,
                });
                form.reset();

                router.push('/dashboard');
            }
        }
    }

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="flex gap-2 justify-between">
                            <Progress
                                value={
                                    ((currentStepIndex + 1) / steps.length) *
                                    100
                                }
                                className="w-[60%]"
                            />
                            {currentStepIndex + 1} / {steps.length}
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {step}

                            <div className="mt-4 flex gap-2 justify-end pr-6">
                                {!isFirstStep && (
                                    <Button type="button" onClick={back}>
                                        <ArrowLeft size={20} /> Back
                                    </Button>
                                )}

                                {!isLastStep && (
                                    <Button
                                        type="button"
                                        onClick={() => next(form.trigger)}
                                    >
                                        Next <ArrowRight size={20} />
                                    </Button>
                                )}

                                {isLastStep && (
                                    <Button
                                        type="submit"
                                        disabled={form.formState.isSubmitting}
                                    >
                                        {form.formState.isSubmitting
                                            ? 'Submitting...'
                                            : 'Submit'}
                                    </Button>
                                )}
                            </div>
                            <div
                                className="flex h-2 items-end space-x-1 pl-6"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {form.formState.errors.root && (
                                    <p className="text-xl text-red-500">
                                        {form.formState.errors.root.message}
                                    </p>
                                )}
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default RegisterRecruiter;
