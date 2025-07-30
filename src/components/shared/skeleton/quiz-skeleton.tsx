// components/skeletons/QuizSkeleton.tsx
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typegraphy";

export default function QuizSkeleton() {
  return (
    <div>
      <div className="flex flex-col  px-2 pt-2 pb-3 md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <Typography size="lg" className="text-start font-bold">
          Quiz Details
        </Typography>
        <div className="text-[13px] flex justify-around items-start sm:items-center gap-2 flex-col sm:flex-row">
          <span className="font-bold">View Quiz /</span> Quiz Management
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row gap-6 p-3">
          {/* Left Section: Quiz Overview */}
          <Card className="flex-1 space-y-2 p-4 shadow-blue-100">
            <div className="h-6 w-full bg-gray-200 rounded" />
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div className="flex gap-5" key={i}>
                  <Skeleton
                    key={i}
                    className="h-5 min-w-[150px] rounded-[4px]"
                  />
                  <Skeleton key={i} className="h-5 w-2/4 rounded-[4px]" />
                </div>
              ))}
            </div>
            {/* <Skeleton className="h-10 w-40 mt-4" /> */}
          </Card>

          {/* Right Section: Other Details */}
          <Card className="w-full lg:w-1/2 space-y-2 p-4 shadow-blue-100">
            <div className="h-6 w-full bg-gray-200 rounded" />
            <div className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <div className="flex gap-5" key={i}>
                  <Skeleton
                    key={i}
                    className="h-5 min-w-[150px] rounded-[4px]"
                  />
                  <Skeleton key={i} className="h-5 w-2/4 rounded-[4px]" />
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="flex gap-3 ml-3 mt-3">
          <Skeleton className="w-36 h-10" />
          <Skeleton className="w-36 h-10" />
        </div>
      </div>
    </div>
  );
}
