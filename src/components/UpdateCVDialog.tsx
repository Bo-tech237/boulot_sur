'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogClose,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './ui/form';
import { ReactNode, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { fileSchema, fileTypes } from '@/lib/applicantSchema';
import { useToast } from './ui/use-toast';
import { handleError } from '@/lib/handleError';
import { Loader2 } from 'lucide-react';
import { Input } from './ui/input';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { updateCV } from '../../convex/applicants';

type Props = {
    children: ReactNode;
};

function UpdateCVDialog({ children }: Props) {
    const updateCV = useMutation(api.applicants.updateCV);
    const generateUploadUrl = useMutation(api.uploads.generateUploadUrl);
    const [isOpen, setIsOpen] = useState(false);
    const { toast } = useToast();

    const form = useForm<fileTypes>({
        resolver: zodResolver(fileSchema),
    });

    const fileRef = form.register('fileId');

    async function onSubmit(value: fileTypes) {
        console.log(value);

        try {
            const postUrl = await generateUploadUrl();

            if (!value.fileId) return;

            const result = await fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': value?.fileId[0].type,
                },
                body: value?.fileId[0],
            });

            if (!result) {
                throw new Error(`Upload failed: ${JSON.stringify(result)}`);
            }

            const { storageId } = await result.json();

            const updatedFile = await updateCV({ fileId: storageId });

            if (updatedFile?.success === false) {
                return form.setError('root', { message: updatedFile?.message });
            }
            if (updatedFile?.success === true) {
                toast({
                    variant: 'success',
                    title: updatedFile.message,
                    description: `${new Date().toLocaleDateString()}`,
                });
                form.reset();
            }
        } catch (error) {
            handleError(error);
            console.log('catch error', error);
        }
    }

    return (
        <div>
            <Dialog onOpenChange={setIsOpen} open={isOpen}>
                <DialogTrigger asChild>
                    <div className="cursor-pointer">{children}</div>
                </DialogTrigger>
                <DialogContent className="w-80 sm:max-w-[425px]">
                    <DialogHeader className="flex flex-col gap-3">
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            Do you want to change your CV?
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="fileId"
                                render={() => (
                                    <FormItem>
                                        <FormLabel>Resume</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                {...fileRef}
                                                accept=".pdf"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="py-4">
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
                                        Update Now
                                    </span>
                                </Button>
                            </div>
                            <div
                                className="flex py-2 items-end"
                                aria-live="polite"
                                aria-atomic="true"
                            >
                                {form.formState.errors.root && (
                                    <p className=" text-sm sm:text-lg text-red-500">
                                        {form.formState.errors.root.message}
                                    </p>
                                )}
                            </div>
                        </form>
                    </Form>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline" type="button">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default UpdateCVDialog;
