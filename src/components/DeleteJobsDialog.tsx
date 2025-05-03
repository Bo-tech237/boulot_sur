"use client";
import { Loader2, LucideTrash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { handleError } from "@/lib/handleError";
import { useTransition } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";

type Props = {
  id: Id<"jobs">;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteJobsDialog({ id, isOpen, setIsOpen }: Props) {
  const deleteJob = useMutation(api.jobs.deleteJob);

  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  async function handleDelete() {
    try {
      const deletedJob = await deleteJob({ jobId: id });

      if (deletedJob.success === false) {
        toast({
          variant: "destructive",
          title: "Delete Job",
          description: deletedJob.message,
        });
        return setIsOpen(false);
      }

      toast({
        variant: "success",
        title: "Delete Job",
        description: deletedJob.message,
      });

      return setIsOpen(false);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div>
      <Dialog onOpenChange={setIsOpen} open={isOpen}>
        <DialogContent className="w-80 sm:max-w-[425px]">
          <DialogHeader className="flex flex-col gap-3">
            <DialogTitle>Are you really sure?</DialogTitle>
            <DialogDescription>
              <span className="text-red-700">WARNING</span> . There will be no
              reverse action.
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
                {isPending && <Loader2 size={16} className="animate-spin" />}
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

export default DeleteJobsDialog;
