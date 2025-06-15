// components/skeletons/QuizSkeleton.tsx
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuizSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col lg:flex-row gap-6 p-6">
        {/* Left Section: Quiz Overview */}
        <Card className="flex-1 space-y-4 p-4 shadow-blue-100">
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-2/3" />
            ))}
          </div>
          <Skeleton className="h-10 w-40 mt-4" />
        </Card>

        {/* Right Section: Other Details */}
        <Card className="w-full lg:w-1/2 space-y-4 p-4 shadow-blue-100">
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-4 w-3/4" />
            ))}
          </div>

          <div className="flex items-center space-x-2 mt-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-8 rounded-full" />
            ))}
          </div>
          <Skeleton className="h-8 w-40 mt-2" />
        </Card>
      </div>
      <Skeleton className="w-36 h-8 ml-6" />
    </div>
  );
}
