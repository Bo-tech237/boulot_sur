'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/ui/dataTableColumnHeader';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import RatingDialog from '@/components/RatingDialog';
import { ShowRating } from '@/components/ui/showRating';
import Link from 'next/link';
import { ApplicationDataType } from '@/types/applications';
import DeleteApplicationsDialog from '@/components/DeleteApplicationsDialog';
import UpdateStatusDialog from '@/components/UpdateStatusDialog';

export const columns: ColumnDef<ApplicationDataType>[] = [
    {
        id: 'select',
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status: string = row.getValue('status');

            return <div className="font-medium uppercase">{status}</div>;
        },
    },
    {
        accessorKey: 'recruiter.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Recruiter" />
        ),
    },
    {
        accessorKey: 'job.title',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Job" />
        ),
        cell: ({ row }) => {
            const title: string = row.getValue('job_title');

            return <div className="font-medium uppercase">{title}</div>;
        },
    },
    {
        accessorKey: 'recruiter.rating',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Recruiter's Rating" />
        ),
        cell: ({ row }) => {
            return (
                <div>
                    <ShowRating userRating={row.getValue('recruiter_rating')} />
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({ row }) => {
            const application = row.original;
            const data = {
                userId: application.applicantId,
                applicantId: application.applicantId,
                recruiterId: application.recruiterId,
                jobId: application.jobId,
            };

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <UpdateStatusDialog application={application}>
                                Change status
                            </UpdateStatusDialog>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <DeleteApplicationsDialog id={application?._id}>
                                Delete Application
                            </DeleteApplicationsDialog>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                            <RatingDialog application={data}>
                                Set Rating
                            </RatingDialog>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href={`/recruiter/${data.recruiterId}`}>
                                Recruiter Profile
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
