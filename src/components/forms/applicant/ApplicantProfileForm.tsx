'use client';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Tag, TagInput } from 'emblor';
import { UseFormReturn } from 'react-hook-form';
import { FormWrapper } from '@/components/forms/formWrapper';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

function ApplicantProfileForm(
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
    const [tags, setTags] = useState<Tag[]>([]);
    const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

    const { setValue } = form;

    const fileRef = form.register('fileId');

    return (
        <div>
            <FormWrapper title="User Profile">
                <FormField
                    control={form.control}
                    name="fileId"
                    render={() => (
                        <FormItem>
                            <FormLabel>Resume</FormLabel>
                            <FormControl>
                                <Input type="file" {...fileRef} accept=".pdf" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skills</FormLabel>
                            <FormControl>
                                <TagInput
                                    {...field}
                                    placeholder="Enter a skill"
                                    tags={tags}
                                    className="sm:min-w-[450px]"
                                    setTags={(newTags) => {
                                        setTags(newTags);
                                        setValue(
                                            'skills',
                                            newTags as [Tag, ...Tag[]]
                                        );
                                    }}
                                    activeTagIndex={activeTagIndex}
                                    setActiveTagIndex={setActiveTagIndex}
                                    clearAll={true}
                                    addOnPaste={true}
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

export default ApplicantProfileForm;
