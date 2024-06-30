'use client';

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
import { ReactNode, useState } from 'react';
import { SelectForm } from './SelectForm';
import { useSession } from 'next-auth/react';
import { ApplicationDataType } from '@/types/applications';

type Props = {
    application: ApplicationDataType;

    children: ReactNode;
};

function UpdateStatusDialog({ application, children }: Props) {
    const { data: session } = useSession();
    const [isOpen, setIsOpen] = useState(false);

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
                            Do you want to change{' '}
                            {session?.user?.role === 'recruiter'
                                ? application?.applicant?.name
                                : 'your'}{' '}
                            status?
                        </DialogDescription>
                    </DialogHeader>

                    <SelectForm
                        applicationId={application?._id}
                        onUpdate={() => setIsOpen(false)}
                    />

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

export default UpdateStatusDialog;
