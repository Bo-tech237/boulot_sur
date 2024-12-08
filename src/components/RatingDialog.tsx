'use client';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './ui/dialog';
import { ReactNode, useState } from 'react';
import Reviews from './Reviews';

type Props = {
    application: {
        userId: string;
        applicantId: string;
        recruiterId: string;
        jobId: string;
    };

    children: ReactNode;
};

function RatingDialog({ application, children }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <Dialog onOpenChange={setIsOpen} open={isOpen}>
                <DialogTrigger asChild>
                    <div className="cursor-pointer">{children}</div>
                </DialogTrigger>
                <DialogContent
                    className="w-80 sm:max-w-[425px]"
                    onKeyDown={(e) => e.stopPropagation()}
                >
                    <DialogHeader className="flex flex-col gap-3">
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            Do you want to give a rating?
                        </DialogDescription>
                    </DialogHeader>

                    <Reviews
                        application={application}
                        onRating={() => setIsOpen(false)}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default RatingDialog;
