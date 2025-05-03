/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
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
import { useToast } from '@/components/ui/use-toast';
import { useMutation } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { useUploadFiles } from '@xixixao/uploadstuff/react';
import UpdateProfileForm from './UpdateProfileForm';
import UpdateEducationForm from './UpdateEducationForm';
import {
    applicantUpdateSchema,
    applicantUpdateTypes,
} from '@/lib/applicantSchema';
import { useUpdateApplicantMultistepForm } from './useUpdateApplicantMultistepForm';
import { Doc, Id } from '../../../../../convex/_generated/dataModel';
import { Progress } from '@/components/ui/progress';

type Props = { applicant: Doc<'applicants'> | null };

function UpdateApplicant({ applicant }: Props) {
    const updateApplicant = useMutation(api.applicants.updateApplicant);
    const generateUploadUrl = useMutation(api.uploads.generateUploadUrl);
    const { startUpload } = useUploadFiles(generateUploadUrl);

    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<applicantUpdateTypes>({
        resolver: zodResolver(applicantUpdateSchema),
        defaultValues: {
            education: [
                {
                    institutionName: applicant?.education![0].institutionName,
                    startYear: applicant?.education![0].startYear,
                    endYear: applicant?.education![0].endYear,
                },
            ],
            skills: applicant?.skills,
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
    } = useUpdateApplicantMultistepForm([
        <UpdateProfileForm {...form} />,
        <UpdateEducationForm {...form} />,
    ]);

    async function onSubmit(data: applicantUpdateTypes) {
        if (applicant === undefined) {
            return <div className="text-center">Loading Applicant...</div>;
        }

        const updatedApplicant = await updateApplicant({
            applicantId: applicant?._id as Id<'applicants'>,
            education: data.education,
            skills: data.skills,
        });
        if (updatedApplicant.success === false) {
            return form.setError('root', {
                message: updatedApplicant.message,
            });
        }
        if (updatedApplicant.success === true) {
            toast({
                variant: 'success',
                title: updatedApplicant.message,
                description: `${new Date()}`,
            });
            return router.push('/dashboard/applicant/profile');
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
                                className="w-[80%]"
                            />
                            {currentStepIndex + 1} / {steps.length}
                        </div>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            {step}

                            <div className="mt-4 flex gap-2 justify-end">
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
                                className="flex h-2 items-end space-x-1"
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
                <CardFooter className="flex justify-end">
                    <Link className="text-sm" href={'/login'}>
                        Already have an account?{' '}
                        <span className="underline text-blue-900">Login</span>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}

function getMimeType(file: File) {
    if (file.type === 'blob') {
        return 'application/octet-stream';
    } else if (file.type === 'pdf') {
        return 'application/pdf';
    } else {
        return file.type;
    }
}

export default UpdateApplicant;
