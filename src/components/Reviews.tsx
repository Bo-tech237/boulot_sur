"use client";

import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { commentSchema, commentTypes } from "@/lib/commentSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { handleError } from "@/lib/handleError";
import { useToast } from "./ui/use-toast";
import { Loader2, Star } from "lucide-react";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";

type Props = {
  precision?: number;
  totalStars?: number;
  application: {
    userId: string;
    applicantId: string;
    recruiterId: string;
    jobId: string;
  };
  onRating: () => void;
};

export default function Reviews({
  precision = 0.5,
  totalStars = 5,
  application,
  onRating,
}: Props) {
  const createComment = useMutation(api.comments.createComment);
  const createRating = useMutation(api.ratings.createRating);
  const [activeStar, setActiveStar] = useState(-1);
  const [hoverActiveStar, setHoverActiveStar] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const ratingContainerRef = useRef<HTMLDivElement>(null);
  const [hasMounted, setHasMounted] = useState(false);
  const { toast } = useToast();

  const form = useForm<commentTypes>({
    resolver: zodResolver(commentSchema),
  });

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  const calculateRating = (e: { clientX: number }) => {
    const { width, left } =
      ratingContainerRef?.current?.getBoundingClientRect() || {
        width: 0,
        left: 0,
      };
    let percent = (e.clientX - left) / width;
    const numberInStars = percent * totalStars;
    const nearestNumber =
      Math.round((numberInStars + precision / 2) / precision) * precision;

    return Number(
      nearestNumber.toFixed(precision.toString().split(".")[1]?.length || 0)
    );
  };

  const handleClick = (e: { clientX: number }) => {
    setIsHovered(false);
    setActiveStar(calculateRating(e));
  };

  const handleMouseMove = (e: { clientX: number }) => {
    setIsHovered(true);
    setHoverActiveStar(calculateRating(e));
  };

  const handleMouseLeave = (e: any) => {
    setHoverActiveStar(-1); // Reset to default state
    setIsHovered(false);
  };

  async function onSubmit(value: commentTypes) {
    console.log(value, activeStar);

    try {
      const result = await createRating({
        rating: activeStar,
        applicantId: application.applicantId,
        jobId: application.jobId,
        recruiterId: application.recruiterId,
      });

      if (result?.success === false) {
        return form.setError("root", { message: result.message });
      }

      const newComment = await createComment({
        userId: application.userId as Id<"users">,
        jobId: application.jobId as Id<"jobs">,
        text: value.text,
      });

      if (newComment.success === false) {
        form.reset();
        return form.setError("root", {
          message: newComment.message,
        });
      }

      toast({
        variant: "success",
        title: "Create Rating",
        description: result?.message,
      });
      form.reset();
      onRating();
    } catch (error) {
      handleError(error);
      console.log("catch error", error);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4 justify-between items-center">
        <div
          style={{
            display: "inline-flex",
            position: "relative",
            cursor: "pointer",
            textAlign: "left",
          }}
          onClick={handleClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          ref={ratingContainerRef}
        >
          {[...new Array(totalStars)].map((_, index) => {
            const activeState = isHovered ? hoverActiveStar : activeStar;
            const showEmptyIcon =
              activeState === -1 || activeState! < index + 1;
            const isActiveRating = activeState !== 1;
            const isRatingWithPrecision = activeState! % 1 !== 0;
            const isRatingEqualToIndex = Math.ceil(activeState!) === index + 1;
            const showRatingWithPrecision =
              isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;
            return (
              <div
                className="relative"
                style={{
                  cursor: "pointer",
                }}
                key={index}
              >
                <div
                  style={{
                    width: showRatingWithPrecision
                      ? `${(activeState! % 1) * 100}%`
                      : "0%",
                    overflow: "hidden",
                    position: "absolute",
                  }}
                >
                  <Star fill="orange" color="orange" />
                </div>
                {/*Note here */}
                <div
                  style={{
                    color: showEmptyIcon ? "gray" : "inherit",
                  }}
                >
                  {showEmptyIcon ? (
                    <Star />
                  ) : (
                    <Star fill="orange" color="orange" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <div className="">{activeStar! > 0 ? activeStar : 0} Star</div>
      </div>
      <div className="py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave a comment here</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Give us a review"
                      className="resize-none"
                      onKeyDown={(e) => e.stopPropagation()}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="py-4 flex gap-2">
              <Button
                variant="secondary"
                type="button"
                onClick={() => onRating()}
                className="flex-1"
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
              className="flex py-2 items-end"
              aria-live="polite"
              aria-atomic="true"
            >
              {form.formState.errors.root && (
                <p className=" text-sm sm:text-lg text-red-500">
                  {form.formState.errors.root.message}
                </p>
              )}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
