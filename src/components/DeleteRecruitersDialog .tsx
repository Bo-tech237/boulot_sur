'use client';
import { Loader2, LucideTrash2 } from 'lucide-react';
import { Button } from './ui/button';
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
import { useRouter } from 'next/navigation';
import { handleError } from '@/lib/handleError';
import { ReactNode, useState, useTransition } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { useAuthActions } from '@convex-dev/auth/react';
import { useToast } from '@/hooks/use-toast';

type Props = {
    id: Id<'users'>;
    children: ReactNode;
};

function DeleteRecruitersDialog({ id, children }: Props) {
    const { signOut } = useAuthActions();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const { toast } = useToast();

    const deleteRecruiter = useMutation(api.recruiters.deleteRecruiter);

    const [isPending, startTransition] = useTransition();

    async function handleDelete() {
        try {
            const deletedRecruiter = await deleteRecruiter({ recruiterId: id });

            console.log('DeleteRecruiters', deletedRecruiter);

            if (deletedRecruiter.success === false) {
                setIsOpen(false);
                toast({
                    variant: 'destructive',
                    title: deletedRecruiter.message,
                    description: `${new Date().toLocaleDateString()}`,
                });
                return;
            }

            setIsOpen(false);
            toast({
                variant: 'success',
                title: deletedRecruiter.message,
                description: `${new Date().toLocaleDateString()}`,
            });
            signOut();

            return;
        } catch (error) {
            handleError(error);
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
                        <DialogTitle>Are you really sure?</DialogTitle>
                        <DialogDescription>
                            <span className="text-red-700">WARNING</span> .
                            There will be no reverse action.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="">
                        <div className="w-full my-4 flex gap-2">
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="flex-1"
                            >
                                Close
                            </Button>

                            <Button
                                disabled={isPending}
                                className="flex-1 gap-2"
                                type="button"
                                onClick={() => startTransition(handleDelete)}
                                variant="destructive"
                            >
                                {isPending && (
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />
                                )}
                                Delete
                                <LucideTrash2 className="h-4 w-5" />
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DeleteRecruitersDialog;
