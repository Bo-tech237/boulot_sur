'use client';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2 } from 'lucide-react';
import { toast } from './ui/use-toast';
import { magicLinkAuth } from '@/actions/magicLinkAuth';
import { magicLinkSchema, magicLinkTypes } from '@/lib/magicLinkSchema';

function MagicLinkAuth() {
    const form = useForm<magicLinkTypes>({
        resolver: zodResolver(magicLinkSchema),
    });

    async function onSubmit(data: magicLinkTypes) {
        const result = await magicLinkAuth(data);

        if (result?.success === false) {
            return form.setError('root', { message: result.message });
        }

        toast({
            variant: 'success',
            title: 'You have log in successfully',
            description: `${new Date().toUTCString()}`,
        });

        form.reset();
    }

    return (
        <div className="">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        type="email"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="mt-4">
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
                    </div>
                    <div
                        className="flex items-end space-x-1 py-3"
                        aria-live="polite"
                        aria-atomic="true"
                    >
                        {form.formState.errors.root && (
                            <p className="text-xl text-red-900">
                                {form.formState.errors.root.message}
                            </p>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default MagicLinkAuth;
