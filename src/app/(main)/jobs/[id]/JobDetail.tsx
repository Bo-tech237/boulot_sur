"use client";

import React from "react";
import JobApplyButton from "@/components/JobApplyDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import H1 from "@/components/ui/h1";
import { formatMoney } from "@/lib/friendly-time";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { Loader2 } from "lucide-react";

type Props = {
  id: string;
};

function JobDetail({ id }: Props) {
  const {
    data: job,
    isPending,
    error,
  } = useQuery(convexQuery(api.jobs.getJobById, { jobId: id as Id<"jobs"> }));

  if (isPending) {
    return (
      <div className="flex gap-2 text-lg py-5 items-center justify-center">
        <Loader2 size={50} className="animate-spin" />
        Loading Job details...
      </div>
    );
  }

  if (!job) {
    console.log("error", error);
    return (
      <div className="flex py-10 items-center justify-center text-red-900">
        No job available
      </div>
    );
  }

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <div className="flex flex-col gap-6">
        <H1 className="uppercase">{job?.title}</H1>
        {/* Responsive stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="bg-boulotRed text-white h-20 rounded-lg flex flex-col items-center justify-center">
            <span>Max Applicants</span>
            <p>{job?.maxApplicants}</p>
          </div>
          <div className="bg-boulotRed text-white h-20 rounded-lg flex flex-col items-center justify-center">
            <span>Max Positions</span>
            <p>{job?.maxPositions}</p>
          </div>
          <div className="bg-boulotRed text-white h-20 rounded-lg flex flex-col items-center justify-center">
            <span>Location</span>
            <p>{job?.location}</p>
          </div>
          <div className="bg-boulotRed text-white h-20 rounded-lg flex flex-col items-center justify-center">
            <span>Salary</span>
            <p>{formatMoney(job?.salary!)}</p>
          </div>
          <div className="bg-boulotRed text-white h-20 rounded-lg flex flex-col items-center justify-center">
            <span>Applied</span>
            <p>{job?.activeApplications}</p>
          </div>
          <div className="bg-boulotRed text-white h-20 rounded-lg flex flex-col items-center justify-center">
            <span>Accepted</span>
            <p>{job?.acceptedApplicants}</p>
          </div>
          <div className="bg-boulotRed text-white h-20 rounded-lg flex flex-col items-center justify-center">
            <span>JobType</span>
            <p>{job?.type}</p>
          </div>
          <div className="bg-boulotRed text-white h-20 rounded-lg flex flex-col items-center justify-center">
            <span>Rating</span>
            <p>{job?.rating}</p>
          </div>
        </div>
        {/* Responsive skills and category */}
        <div className="flex flex-col md:flex-row gap-5 items-start md:items-center justify-between">
          <div className="w-full md:w-auto">
            <h1 className="font-bold uppercase mb-2 text-lg sm:text-2xl">
              Skills
            </h1>
            <div className="flex flex-wrap gap-2">
              {job?.skillsets.map((skill) => (
                <Badge key={skill.id} className="p-2 capitalize">
                  {skill.text}
                </Badge>
              ))}
            </div>
          </div>
          <div className="w-full md:w-auto mt-4 md:mt-0">
            <h1 className="font-bold uppercase mb-2 text-lg sm:text-2xl">
              Category
            </h1>
            <p>
              <Badge className="p-2 capitalize">{job?.category}</Badge>
            </p>
          </div>
        </div>
        {/* Description */}
        {job && (
          <div
            className="ProseMirror whitespace-pre-line py-4"
            style={{ whiteSpace: "pre-line" }}
            dangerouslySetInnerHTML={{ __html: job?.description }}
          />
        )}
        {/* Responsive action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <div className="flex-1">
            <JobApplyButton jobId={job?._id!} />
          </div>
          {/* Removed Back to Jobs button */}
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
