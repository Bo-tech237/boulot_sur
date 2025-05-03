import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminWelcome() {
  const {
    data: stats,
    isPending: statsPending,
    error: statsError,
  } = useQuery(convexQuery(api.admin.getAdminStats, {}));

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Stats */}
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {statsPending ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="flex flex-col items-center">
              <CardHeader>
                <Skeleton className="h-8 w-16 mb-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))
        ) : statsError ? (
          <Card className="col-span-6 flex justify-center items-center h-24">
            <CardContent className="text-red-500">
              Error loading statistics
            </CardContent>
          </Card>
        ) : (
          <>
            <StatCard label="Applicants" value={stats?.applicants ?? 0} />
            <StatCard label="Recruiters" value={stats?.recruiters ?? 0} />
            <StatCard label="Jobs" value={stats?.jobs ?? 0} />
            <StatCard label="Applications" value={stats?.applications ?? 0} />
            <StatCard label="Categories" value={stats?.categories ?? 0} />
            <StatCard label="Comments" value={stats?.comments ?? 0} />
          </>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <Card className="flex flex-col items-center">
      <CardHeader>
        <CardTitle className="text-blue-700 text-3xl font-bold">
          {value}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-gray-500">{label}</div>
      </CardContent>
    </Card>
  );
}
