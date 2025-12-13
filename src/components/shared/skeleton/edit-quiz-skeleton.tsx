"use client";

import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typegraphy";

const EditQuizSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col  px-2 pt-2 pb-3 md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <Typography size="lg" className="text-start font-bold">
          Quiz Details
        </Typography>
        <div className="text-[13px] flex justify-around items-start sm:items-center gap-2 flex-col sm:flex-row">
          <span className="font-bold">Create Quiz /</span> Quiz Management
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-full">
          <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6">
            <Skeleton className="h-6 w-32 rounded-[4px]" />{" "}
            {/* Quiz Details title */}
            {/* Image Upload Box */}
            <div className="relative border border-dashed rounded-md p-4 h-48 flex items-center justify-center">
              <Skeleton className="w-full h-full rounded-md" />
            </div>
            {/* Quiz Title */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded-[4px]" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            {/* Date & Time */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded-[4px]" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-10 rounded-[4px]" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
            {/* Join Type */}
            <div className="flex space-x-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-[4px]" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-[4px]" />
              </div>
            </div>
            {/* Max Users, Quiz Price, Countdown */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded-[4px]" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded-[4px]" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 rounded-[4px]" />
                <Skeleton className="h-10 w-full rounded-md" />
              </div>
            </div>
            {/* Moderator Dropdown */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 rounded-[4px]" />
              <Skeleton className="h-10 w-full rounded-md" />
            </div>
            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-4 w-24 rounded-[4px]" />
              <Skeleton className="h-24 w-full rounded-md" />
            </div>
          </div>
        </div>
        <div className="h-full">
          <div className="rounded-xl border bg-white p-6 shadow-sm space-y-6 h-full flex flex-col">
            <Skeleton className="h-6 w-40 mb-4 rounded-[4px]" />{" "}
            {/* Questions title */}
            <div className="space-y-4 flex-1 overflow-y-auto">
              {/* Simulate 3 loading question cards */}
              {[1, 2, 3].map((_, idx) => (
                <div
                  key={idx}
                  className="border rounded-lg p-4 space-y-3 bg-gray-50"
                >
                  <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-8 rounded-sm" />
                    <Skeleton className="h-8 w-full" />
                  </div>
                  {/* <Skeleton className="h-4 w-3/4" /> */}
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-1/2 rounded-md" />
                    <Skeleton className="h-8 w-1/2 rounded-md" />
                  </div>
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-1/2 rounded-md" />
                    <Skeleton className="h-8 w-1/2 rounded-md" />
                  </div>
                  {/* <div className="flex justify-end space-x-2">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div> */}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-4">
              <Skeleton className="h-10 w-32 rounded-md" />{" "}
              {/* Save/Update button */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQuizSkeleton;
