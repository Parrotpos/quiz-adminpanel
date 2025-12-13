import CustomLoader from "@/components/loader/loader";
import { Button } from "@/components/ui/button";
import React from "react";

const GradientButton = ({
  children,
  className = "",
  title = "Button",
  fromGradient = "from-[#0E76BC]",
  toGradient = "to-[#283891]",
  disabled = false,
  loading = false,
  onClick,
  ...props
}: IGradientButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button
      className={`h-10 bg-gradient-to-r ${fromGradient} ${toGradient} text-white border-none hover:opacity-90 cursor-pointer ${className}`}
      disabled={disabled || loading}
      onClick={handleClick}
      {...props}
    >
      {children}
      {loading && <CustomLoader size={20} color="white" />}
    </Button>
  );
};

export default GradientButton;
