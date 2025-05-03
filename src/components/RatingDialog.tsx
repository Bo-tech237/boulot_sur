"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { StarRating } from "./StarRating";
import { ReviewForm } from "./ReviewForm";

type Props = {
  application: {
    userId: string;
    applicantId: string;
    recruiterId: string;
    jobId: string;
  };
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RatingDialog({
  application,
  isOpen,
  setIsOpen,
}: Props) {
  const [rating, setRating] = useState<number>(0);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="w-80 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Your Review</DialogTitle>
          <DialogDescription>
            Select a rating and leave a comment
          </DialogDescription>
        </DialogHeader>
        <div className="my-4 flex gap-3 justify-between items-center">
          <StarRating value={rating} onChange={setRating} maxStars={5} />
          <span>{rating}</span>
        </div>
        <ReviewForm
          application={application}
          rating={rating}
          onClose={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
