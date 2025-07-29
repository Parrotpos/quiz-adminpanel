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
            {[...Array(8)].map((_, i) => (
              <div className="flex gap-5" key={i}>
                <Skeleton key={i} className="h-5 w-2/6" />
                <Skeleton key={i} className="h-5 w-2/4" />
              </div>
            ))}
          </div>
          {/* <Skeleton className="h-10 w-40 mt-4" /> */}
        </Card>

        {/* Right Section: Other Details */}
        <Card className="w-full lg:w-1/2 space-y-4 p-4 shadow-blue-100">
          <div className="h-6 w-1/3 bg-gray-200 rounded" />
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div className="flex gap-5" key={i}>
                <Skeleton key={i} className="h-5 w-2/6" />
                <Skeleton key={i} className="h-5 w-2/4" />
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="flex gap-3 ml-6">
        <Skeleton className="w-36 h-8" />
        <Skeleton className="w-36 h-8" />
      </div>
    </div>
  );
}
