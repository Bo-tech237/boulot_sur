import JobPostings from "@/components/JobPostings";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecruiterWelcome() {
  // Fetch recruiter statistics
  const { data: stats, isPending } = useQuery(
    convexQuery(api.recruiters.getRecruiterStats, {})
  );

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
        {isPending ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="flex flex-col items-center">
              <CardHeader>
                <Skeleton className="h-8 w-16 mb-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-20" />
              </CardContent>
            </Card>
          ))
        ) : (
          <>
            <StatCard label="Total Jobs" value={stats?.totalJobs ?? 0} />
            <StatCard label="Active Jobs" value={stats?.activeJobs ?? 0} />
            <StatCard
              label="Total Applications"
              value={stats?.totalApplications ?? 0}
            />
            <StatCard label="Accepted" value={stats?.accepted ?? 0} />
          </>
        )}
      </div>
      {/* You can add JobPostings or other recruiter content below */}
      {/* <JobPostings /> */}
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
