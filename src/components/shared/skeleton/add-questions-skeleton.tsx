"use client";

import { Skeleton } from "@/components/ui/skeleton";

const AddQuestionsSkeleton: React.FC<AddQuesSkeletonType> = ({
  numOfCards = 2,
}) => {
  return (
    <div className="space-y-6">
      <Skeleton className="h-6 w-40 rounded-md" /> {/* Add Questions Header */}
      {Array.from({ length: numOfCards }).map((_, qIndex) => (
        <div
          key={qIndex}
          className="rounded-xl border-[1px] p-4 space-y-4 bg-white shadow-xs"
        >
          <Skeleton className="h-5 w-32 rounded" /> {/* "Question 1" label */}
          <Skeleton className="h-12 w-full rounded-md" /> {/* Question input */}
          {/* Options Grid */}
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((_, optIndex) => (
              <div key={optIndex} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 rounded" /> {/* Checkbox */}
                <Skeleton className="h-10 w-full rounded-md" /> {/* Input */}
                <Skeleton className="h-8 w-8 rounded-md" />{" "}
                {/* Trash or + Button */}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddQuestionsSkeleton;
