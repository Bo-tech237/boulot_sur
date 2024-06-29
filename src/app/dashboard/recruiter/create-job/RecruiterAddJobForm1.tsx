import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormWrapper } from '@/components/forms/formWrapper';

function RecruiterAddJobForm1(
    form: UseFormReturn<
        {
            title: string;
            type: string;
            maxApplicants: number;
            maxPositions: number;
            skillsets: {
                text: string;
                id: string;
            }[];
            description: string;
            location: string;
            salary: number;
            category: string;
            activeApplications?: number | undefined;
            acceptedApplicants?: number | undefined;
            rating?: number | undefined;
        },
        any,
        undefined
    >
) {
    return (
        <div>
            <FormWrapper title="User Details">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="maxApplicants"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Max Applicants</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Max Applicants"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="maxPositions"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Max Positions</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Max Positions"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </FormWrapper>
        </div>
    );
}

export default RecruiterAddJobForm1;
