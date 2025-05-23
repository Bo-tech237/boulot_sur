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
  DialogTrigger,
} from "./ui/dialog";
import { handleError } from "@/lib/handleError";
import { useTransition } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useToast } from "@/hooks/use-toast";

type Props = {
  id: Id<"applications">;
  isDeleteOpen: boolean;
  setIsDeleteOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteApplicationsDialog({
  id,
  isDeleteOpen,
  setIsDeleteOpen,
}: Props) {
  const deleteApplication = useMutation(api.applications.deleteApplication);

  const [isPending, startTransition] = useTransition();

  const { toast } = useToast();

  async function handleDelete() {
    try {
      const deletedApplication = await deleteApplication({
        applicationId: id,
      });

      if (deletedApplication?.success === false) {
        toast({
          variant: "destructive",
          title: "Delete Application",
          description: deletedApplication.message,
        });
        console.log("DeleteDialog", deletedApplication);
        setIsDeleteOpen(false);
        return;
      }

      toast({
        variant: "success",
        title: "Delete Application",
        description: deletedApplication.message,
      });

      return setIsDeleteOpen(false);
    } catch (error) {
      handleError(error);
    }
  }

  return (
    <div>
      <Dialog onOpenChange={setIsDeleteOpen} open={isDeleteOpen}>
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
                onClick={() => setIsDeleteOpen(false)}
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

export default DeleteApplicationsDialog;
