"use client";

import React from "react";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

const CustomLoader = ({
  size = 30,
  color = "black",
  className,
}: LoaderProps) => {
  return (
    <Loader
      className={cn("animate-spin text-muted-foreground", className)}
      size={size}
      strokeWidth={2.5}
      color={color}
    />
  );
};

export default CustomLoader;
