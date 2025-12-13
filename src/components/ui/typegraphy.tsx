import { cn } from "@/lib/utils";
import { ReactNode, ElementType } from "react";

type TypographyProps = {
  as?: ElementType;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children: ReactNode;
};

const sizeMap: Record<NonNullable<TypographyProps["size"]>, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg font-semibold",
  xl: "text-xl font-bold",
};

const Typography = ({
  as: Component = "p",
  size = "md",
  className = "",
  children,
}: TypographyProps) => {
  return (
    <Component className={cn(sizeMap[size], className)}>{children}</Component>
  );
};

export default Typography;
