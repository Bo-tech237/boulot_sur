"use client";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { handleError } from "@/lib/handleError";

function JobApplyButton({ jobId }: { jobId: Id<"jobs"> }) {
  const applyForJob = useMutation(api.applications.createApplication);
  const { toast } = useToast();
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onApply() {
    setIsSubmitting(true);
    setError(null);
    try {
      const result = await applyForJob({ jobId });
      if (result?.success === false) {
        setError(result.message);
        setIsSubmitting(false);
        return;
      }
      toast({
        variant: "success",
        title: "Apply For A Job",
        description: result.message,
      });
      router.push("/jobs");
    } catch (error) {
      handleError(error);
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col w-full">
      <Button
        type="button"
        disabled={isSubmitting}
        className="w-full text-xl"
        onClick={onApply}
      >
        <span className="flex items-center justify-center gap-1">
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          Apply
        </span>
      </Button>
      {error && (
        <p className="text-sm sm:text-lg text-red-500 mt-2 text-center">
          {error}
        </p>
      )}
    </div>
  );
}

export default JobApplyButton;
