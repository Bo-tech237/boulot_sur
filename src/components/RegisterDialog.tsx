'use client';

import { Session } from 'next-auth';
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
import { useState } from 'react';
import RegisterRecruiter from './RegisterRecruiter';
import RegisterApplicant from './RegisterApplicant';

type Props = {
    session: Session;
};

function RegisterDialog({ session }: Props) {
    const user = session.user;
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div>
            <Dialog defaultOpen={true} onOpenChange={setIsOpen} open={isOpen}>
                <DialogTrigger></DialogTrigger>
                <DialogContent>
                    <DialogHeader className="flex flex-col gap-3">
                        <DialogTitle>Register</DialogTitle>
                        <DialogDescription>
                            Complete your registration
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default RegisterDialog;
