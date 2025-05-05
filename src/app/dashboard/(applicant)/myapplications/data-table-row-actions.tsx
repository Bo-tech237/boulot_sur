"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import RatingDialog from "@/components/RatingDialog";
import Link from "next/link";
import DeleteApplicationsDialog from "@/components/DeleteApplicationsDialog";
import UpdateStatusDialog from "@/components/UpdateStatusDialog";
import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { ApplicationDataType } from "@/types/applications";

interface DataTableRowActionsProps {
  row: Row<ApplicationDataType>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const application = row.original;
  const data = {
    userId: application.applicantId,
    applicantId: application.applicantId,
    recruiterId: application.recruiterId,
    jobId: application.jobId,
  };

  return (
    <>
      <RatingDialog application={data} isOpen={isOpen} setIsOpen={setIsOpen} />

      <UpdateStatusDialog
        application={application}
        isEditOpen={isEditOpen}
        setIsEditOpen={setIsEditOpen}
      />

      <DeleteApplicationsDialog
        id={application?._id}
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
      />

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => setIsEditOpen(true)}
          >
            Change Status
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => setIsDeleteOpen(true)}
          >
            Delete Application
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={() => setIsOpen(true)}
          >
            Set Rating
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href={`/recruiter/${data.recruiterId}`}>
              Recruiter Profile
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
