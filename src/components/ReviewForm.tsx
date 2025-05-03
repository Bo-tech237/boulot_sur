"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { commentSchema, commentTypes } from "@/lib/commentSchema";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useToast } from "@/components/ui/use-toast";
import { Id } from "../../convex/_generated/dataModel";
import { Loader2 } from "lucide-react";

type ReviewFormProps = {
  application: {
    userId: string;
    applicantId: string;
    recruiterId: string;
    jobId: string;
  };
  rating: number;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ReviewForm({ application, rating, onClose }: ReviewFormProps) {
  const toast = useToast();
  const createComment = useMutation(api.comments.createComment);
  const createRating = useMutation(api.ratings.createRating);
  const form = useForm<commentTypes>({
    resolver: zodResolver(commentSchema),
  });

  async function onSubmit(values: commentTypes) {
    try {
      const ratingResult = await createRating({
        rating,
        applicantId: application.applicantId,
        jobId: application.jobId,
        recruiterId: application.recruiterId,
      });

      if (ratingResult?.success === false) {
        form.setError("root", { message: ratingResult.message });
        return;
      }

      const commentResult = await createComment({
        userId: application.userId as Id<"users">,
        jobId: application.jobId as Id<"jobs">,
        text: values.text,
      });

      if (commentResult.success === false) {
        form.setError("root", { message: commentResult.message });
        return;
      }

      toast.toast({
        variant: "success",
        title: "Rating submitted",
        description: "Your review and rating have been submitted.",
      });
      form.reset();
      return onClose(false);
    } catch (error) {
      console.error(error);
      form.setError("root", { message: "Submission error. Try again." });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Leave a comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your review..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-2 mt-4">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => onClose(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 gap-2"
            disabled={form.formState.isSubmitting}
          >
            <span className="flex items-center justify-center gap-1">
              {form.formState.isSubmitting && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Submit
            </span>
          </Button>
        </div>
        {form.formState.errors.root && (
          <p className="text-red-500 mt-2">
            {form.formState.errors.root.message}
          </p>
        )}
      </form>
    </Form>
  );
}
