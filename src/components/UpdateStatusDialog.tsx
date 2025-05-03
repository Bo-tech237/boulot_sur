"use client";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ReactNode, useState } from "react";
import { SelectForm } from "./SelectForm";
import { ApplicationDataType } from "@/types/applications";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { Loader2 } from "lucide-react";
import { api } from "../../convex/_generated/api";

type Props = {
  application: ApplicationDataType;

  isEditOpen: boolean;
  setIsEditOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function UpdateStatusDialog({ application, isEditOpen, setIsEditOpen }: Props) {
  const { data, isPending, error } = useQuery(
    convexQuery(api.users.getUser, {})
  );

  if (isPending) {
    return (
      <div className="flex gap-2 text-lg py-5 items-center justify-center">
        <Loader2 size={50} className="animate-spin" />
        Loading User...
      </div>
    );
  }

  if (!data || !data.roles) {
    console.log("error:", error);
    return (
      <div className="flex gap-2 text-lg py-5 items-center justify-center">
        User not available
      </div>
    );
  }

  return (
    <div>
      <Dialog onOpenChange={setIsEditOpen} open={isEditOpen}>
        <DialogContent className="w-80 sm:max-w-[425px]">
          <DialogHeader className="flex flex-col gap-3">
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              Do you want to change{" "}
              {data?.roles.some((role) => role === "recruiter")
                ? application?.applicant?.name
                : "your"}{" "}
              status?
            </DialogDescription>
          </DialogHeader>

          <SelectForm
            applicationId={application?._id}
            onUpdate={setIsEditOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateStatusDialog;
