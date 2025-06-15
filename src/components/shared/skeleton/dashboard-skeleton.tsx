"use client";

import { Skeleton } from "@/components/ui/skeleton";
import QuizCardKkeleton from "./quiz-card-skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header Skeleton */}
      {/* <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-60" />
          <Skeleton className="h-8 w-20 rounded-md" />
          <Skeleton className="h-8 w-20 rounded-md" />
        </div>
      </div> */}

      {/* Quiz Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1].map((_, i) => (
          <QuizCardKkeleton key={`${i} detail`} />
        ))}
      </div>

      {/* Quiz History Title */}
      <Skeleton className="h-6 w-44 mt-6" />

      {/* Quiz History Placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((_, i) => (
          <QuizCardKkeleton key={`${i} history`} />
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
