// @ts-nocheck

import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const TextareaField: React.FC<TextareaFieldProps> = ({
  id,
  label,
  className = "",
  placeholder,
  register,
  error,
  rows = 4,
  ...props
}) => {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      {label && (
        <Label htmlFor={id} className="text-[13px] font-normal text-[#3b3a3a]">
          {label}
        </Label>
      )}
      <Textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        {...register?.(id)}
        className={`w-full rounded-md border focus:!ring-0 ${
          error ? "border-red-500" : "border-gray-200"
        } ${className}`}
        {...props}
      />
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default TextareaField;
