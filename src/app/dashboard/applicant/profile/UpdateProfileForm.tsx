'use client';

import React from 'react';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Tag, TagInput } from '@/components/tag/tag-input';
import { UseFormReturn } from 'react-hook-form';
import { FormWrapper } from '@/components/forms/formWrapper';

function UpdateProfileForm(
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
        },
        any,
        undefined
    >
) {
    const [tags, setTags] = React.useState<Tag[]>([]);
    const { setValue } = form;

    return (
        <div>
            <FormWrapper title="User Profile">
                <FormField
                    control={form.control}
                    name="skills"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Skills</FormLabel>
                            <FormControl>
                                <TagInput
                                    {...field}
                                    placeholder="Enter a skill and press enter"
                                    tags={
                                        field.value?.length > 0
                                            ? field.value
                                            : tags
                                    }
                                    className=""
                                    inputFieldPostion="top"
                                    draggable={true}
                                    setTags={(newTags) => {
                                        setTags(newTags);
                                        setValue(
                                            'skills',
                                            newTags as [Tag, ...Tag[]]
                                        );
                                    }}
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

export default UpdateProfileForm;
