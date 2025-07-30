import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import React from "react";
interface QuizCardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  // Add custom props here if needed in the future
}

const QuizCardKkeleton: React.FC<QuizCardSkeletonProps> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn("rounded-2xl shadow-md overflow-hidden w-full bg-white")}
    >
      {/* Top colored image + share icon + badge */}
      <div className={cn("relative h-28 bg-gray-200", className)}>
        {/* badge */}
        {/* <div className="absolute top-3 left-3 flex items-center gap-2 bg-white/30 backdrop-blur-sm text-white text-sm font-medium rounded-full px-3 py-1">
          <Skeleton className="h-4 w-4 rounded-full bg-white/60" />
          <Skeleton className="h-4 w-20 bg-white/60" />
        </div> */}

        {/* Share icon */}
        {/* <div className="absolute top-3 right-3">
          <Skeleton className="h-6 w-6 rounded-full bg-white/60" />
        </div> */}

        {/* Centered logo area */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-10 w-36 rounded-md bg-white/60" />
        </div>
      </div>

      {/* Bottom section */}
      <div className="px-4 py-3 flex justify-between items-center">
        <div>
          <Skeleton className="h-5 w-32 mb-1" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>

        {/* Link icon */}
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </div>
  );
};

export default QuizCardKkeleton;
