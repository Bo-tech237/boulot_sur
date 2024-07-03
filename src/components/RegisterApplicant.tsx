/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { applicantTypes, applicantSchema } from '@/lib/applicantSchema';
import { useApplicantMultistepForm } from '@/hooks/useApplicantMultistepForm';
import ApplicantEducationForm from '@/components/forms/applicant/ApplicantEducationForm';
import ApplicantProfileForm from '@/components/forms/applicant/ApplicantProfileForm';
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
import { api } from '../../convex/_generated/api';
import { Progress } from '@/components/ui/progress';
import { useSession } from 'next-auth/react';

function RegisterApplicant() {
    const createApplicant = useMutation(api.applicants.createApplicant);
    const generateUploadUrl = useMutation(api.uploads.generateUploadUrl);
    const { toast } = useToast();
    const router = useRouter();
    const { update } = useSession();

    const form = useForm<applicantTypes>({
        resolver: zodResolver(applicantSchema),
        defaultValues: {
            education: [
                {
                    institutionName: '',
                    startYear: '',
                    endYear: '',
                },
            ],
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
    } = useApplicantMultistepForm([
        <ApplicantEducationForm {...form} />,
        <ApplicantProfileForm {...form} />,
    ]);

    async function onSubmit(data: applicantTypes) {
        const postUrl = await generateUploadUrl();

        if (!data.fileId) return;

        const result = await fetch(postUrl, {
            method: 'POST',
            headers: {
                'Content-Type': data?.fileId[0].type,
            },
            body: data?.fileId[0],
        });

        if (!result) {
            throw new Error(`Upload failed: ${JSON.stringify(result)}`);
        }

        const { storageId } = await result.json();

        console.log('just now', storageId, data.fileId, 'url', postUrl);

        const newApplicant = await createApplicant({
            education: data.education,
            skills: data.skills,
            fileId: storageId,
        });
        console.log('NewApplicant', newApplicant);
        if (newApplicant?.success === false) {
            return form.setError('root', { message: newApplicant?.message });
        }
        if (newApplicant?.success === true) {
            update();
            toast({
                variant: 'success',
                title: newApplicant.message,
                description: `${new Date().toLocaleDateString()}`,
            });
            form.reset();

            router.push('/dashboard');
        }
    }

    return (
        <div>
            <Card className="border-none">
                <CardHeader>
                    <CardTitle>
                        <div className="flex gap-1 items-center justify-between">
                            <Progress
                                value={
                                    ((currentStepIndex + 1) / steps.length) *
                                    100
                                }
                                className="w-[60%] h-6 md:w-[80%] md:h-7"
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
                                className="flex h-2 mt-10 items-center justify-center space-x-1"
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

function getMimeType(file: File) {
    if (file.type === 'blob') {
        return 'application/octet-stream';
    } else if (file.type === 'pdf') {
        return 'application/pdf';
    } else {
        return file.type;
    }
}

export default RegisterApplicant;
