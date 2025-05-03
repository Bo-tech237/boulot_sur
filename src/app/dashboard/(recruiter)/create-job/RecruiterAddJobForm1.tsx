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
import { jobsTypes } from '@/lib/jobSchema';

function RecruiterAddJobForm1(
    form: UseFormReturn<
        jobsTypes
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
