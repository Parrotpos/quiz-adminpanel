"use client";

import { Skeleton } from "@/components/ui/skeleton";
import QuizCardKkeleton from "./quiz-card-skeleton";

const DashboardSkeleton = () => {
  return (
    <div className="space-y-3">

      {/* Quiz Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-6 mb-10">
        {[1].map((_, i) => (
          <QuizCardKkeleton key={`${i} detail`} />
        ))}
      </div>

      {/* Quiz History Title */}
      <Skeleton className="h-6 w-44 mt-10" />

      {/* Quiz History Placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((_, i) => (
          <QuizCardKkeleton key={`${i} history`} className="h-36"/>
        ))}
      </div>
    </div>
  );
};

export default DashboardSkeleton;
