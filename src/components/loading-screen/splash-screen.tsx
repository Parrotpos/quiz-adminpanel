"use client";

import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";
import CustomLoader from "../loader/loader";

type LoadingSpinnerProps = {
  size?: number;
  className?: string;
  text?: string;
  color?: string;
};

export const SplashScreen = ({
  size,
  className,
  text,
  color,
}: LoadingSpinnerProps) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 p-4 min-h-screen">
      <CustomLoader size={size} className={className} color={color} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};
