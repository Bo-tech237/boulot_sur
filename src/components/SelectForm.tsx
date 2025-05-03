"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

const FormSchema = z.object({
  status: z.string().min(1, { message: "Please select an action to display." }),
});

type Prop = {
  applicationId: string;
  onUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

type StatusType = {
  status:
    | "applied"
    | "shortlisted"
    | "accepted"
    | "rejected"
    | "deleted"
    | "cancelled"
    | "finished";
};

export function SelectForm({ applicationId, onUpdate }: Prop) {
  const updateApplication = useMutation(api.applications.updateApplication);
  const router = useRouter();
  const { data, isPending, error } = useQuery(
    convexQuery(api.users.getUser, {})
  );
  const form = useForm<StatusType>({
    resolver: zodResolver(FormSchema),
  });

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

  async function onSubmit(data: StatusType) {
    const updatedApplication = await updateApplication({
      status: data.status,
      applicationId: applicationId as Id<"applications">,
    });

    if (updatedApplication?.success === false) {
      return form.setError("root", {
        message: updatedApplication.message,
      });
    }

    if (updatedApplication?.success === true) {
      toast({
        variant: "success",
        title: "Updated Status",
        description: updatedApplication.message,
      });
      onUpdate(false);
      form.reset();

      return;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status to display" />
                  </SelectTrigger>
                </FormControl>
                {data?.roles?.some((role) => role === "recruiter") && (
                  <SelectContent>
                    <SelectItem value="shortlisted">shortlist</SelectItem>
                    <SelectItem value="accepted">accept</SelectItem>
                    <SelectItem value="rejected">reject</SelectItem>
                    <SelectItem value="finished">finish</SelectItem>
                  </SelectContent>
                )}

                {data?.roles?.some((role) => role === "applicant") && (
                  <SelectContent>
                    <SelectItem value="cancelled">cancel</SelectItem>
                  </SelectContent>
                )}
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2">
          <Button
            variant="outline"
            type="button"
            className="flex-1"
            onClick={() => onUpdate(false)}
          >
            Close
          </Button>

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="flex-1"
          >
            <span className="flex items-center justify-center gap-1">
              {form.formState.isSubmitting && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Submit
            </span>
          </Button>
        </div>
        <div
          className="flex mt-2 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {form.formState.errors.root && (
            <p className="text-xl text-red-500">
              {form.formState.errors.root.message}
            </p>
          )}
        </div>
      </form>
    </Form>
  );
}
