import React from "react";

declare global {
  interface IGradientButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title?: string;
    className?: string;
    fromGradient?: string;
    toGradient?: string;
    disabled?: boolean
    loading?: boolean
  }
}
