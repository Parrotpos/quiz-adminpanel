"use client";

import { Inbox } from "lucide-react";
import { cn } from "@/lib/utils";

interface NoDataFoundProps {
  title?: string;
  description?: string;
  className?: string;
}

const NoDataFound = ({
  title = "No data found",
  description = "There is currently no content to display.",
  className,
}: NoDataFoundProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center py-12 px-4 w-full border border-dashed border-gray-300 rounded-md bg-muted/50",
        className
      )}
    >
      <Inbox className="w-10 h-10 text-muted-foreground mb-3" />
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          {description}
        </p>
      )}
    </div>
  );
};

export default NoDataFound