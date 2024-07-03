'use client';
import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { FormWrapper } from '@/components/forms/formWrapper';
import { Button } from '@/components/ui/button';

function ApplicantEducationForm(
    form: UseFormReturn<
        {
            education: {
                institutionName: string;
                startYear: string;
                endYear: string;
            }[];
            skills: {
                text: string;
                id: string;
            }[];
            fileId: FileList;
        },
        any,
        undefined
    >
) {
    const {
        fields: educationFields,
        append,
        remove,
    } = useFieldArray({
        control: form.control,
        name: 'education',
    });

    return (
        <div>
            <FormWrapper title="Education">
                {educationFields.map((field, index) => (
                    <div key={field.id}>
                        <FormField
                            control={form.control}
                            name={`education.${index}.institutionName`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Institution</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Institution name"
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
                            name={`education.${index}.startYear`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Start Year</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="First year"
                                            type="date"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name={`education.${index}.endYear`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>End Year</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="End of year"
                                            type="date"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-2 items-center justify-between py-2">
                            <Button
                                type="button"
                                onClick={() => append(educationFields)}
                            >
                                Add education
                            </Button>
                            <Button
                                disabled={index === 0}
                                type="button"
                                onClick={() => remove(index)}
                            >
                                Remove
                            </Button>
                        </div>
                    </div>
                ))}
            </FormWrapper>
        </div>
    );
}

export default ApplicantEducationForm;
