/* eslint-disable react/jsx-key */
'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { jobApiTypes, jobSchema, jobTypes } from '@/lib/jobSchema';
import { useRecruiterAddStepForm } from '@/hooks/useRecruiterAddStepForm';
import RecruiterAddJobForm1 from './RecruiterAddJobForm1';
import RecruiterAddJobForm2 from './RecruiterAddJobForm2';
import RecruiterAddJobForm3 from './RecruiterAddJobForm3';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { handleError } from '@/lib/handleError';
import { api } from '../../../../../convex/_generated/api';
import { useMutation } from 'convex/react';
import { Progress } from '@/components/ui/progress';
import { useStableQuery } from '@/hooks/useStableQuery';

type UpdateJobprops = {
    job: jobApiTypes;
};

function UpdateJob({ job }: UpdateJobprops) {
    const categories = useStableQuery(api.categories.getAllCategories);
    const updateJob = useMutation(api.jobs.updateJob);
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<jobTypes>({
        resolver: zodResolver(jobSchema),
        defaultValues: {
            type: job?.type,
            title: job?.title,
            maxApplicants: job?.maxApplicants,
            maxPositions: job?.maxPositions,
            skillsets: job?.skillsets,
            description: job?.description,
            location: job?.location,
            salary: job?.salary,
            category: job?.category,
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
    } = useRecruiterAddStepForm([
        <RecruiterAddJobForm1 {...form} />,
        <RecruiterAddJobForm2 form={form} categories={categories!} />,
        <RecruiterAddJobForm3 {...form} />,
    ]);

    async function onSubmit(data: any) {
        console.log(data, 'job:', job);

        try {
            if (!job) return null;

            const updatedJob = await updateJob({
                jobId: job?._id,
                ...data,
            });
            if (updatedJob.success === true) {
                toast({
                    variant: 'success',
                    title: updatedJob.message,
                    description: `${new Date().toUTCString()}`,
                });
                return router.push('/dashboard/recruiter/jobs');
            }
            return form.setError('root', {
                message: 'Error when updating job.',
            });
        } catch (error) {
            handleError(error);
        } finally {
            return;
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
                                        <span className="flex items-center justify-center gap-1">
                                            {form.formState.isSubmitting && (
                                                <Loader2
                                                    size={16}
                                                    className="animate-spin"
                                                />
                                            )}
                                            Submit
                                        </span>
                                    </Button>
                                )}
                            </div>
                            <div
                                className="pl-6"
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

export default UpdateJob;
