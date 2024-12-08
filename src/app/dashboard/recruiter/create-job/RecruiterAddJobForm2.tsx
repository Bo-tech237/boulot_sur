import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { FormWrapper } from '@/components/forms/formWrapper';
import { jobTypes } from '@/constants/data';
import { Doc } from '../../../../../convex/_generated/dataModel';
import { Loader2 } from 'lucide-react';

type Props = {
    isPending: boolean;
    categories: Doc<'categories'>[];
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
    >;
};

function RecruiterAddJobForm2({ categories, form, isPending }: Props) {
    if (isPending) {
        return (
            <div className="flex gap-2 text-lg py-5 items-center justify-center">
                <Loader2 size={50} className="animate-spin" />
                Loading Categories...
            </div>
        );
    }

    if (!categories) {
        return (
            <div className="flex py-10 items-center justify-center text-red-900 text-center">
                No category available
            </div>
        );
    }

    return (
        <div>
            <FormWrapper title="User Details">
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job type</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Job type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {jobTypes.map((jobType) => (
                                        <SelectItem
                                            key={jobType}
                                            value={jobType}
                                        >
                                            {jobType}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Job category</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Job category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category._id}
                                            value={category.name}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Location"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Salary</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Salary"
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

export default RecruiterAddJobForm2;
