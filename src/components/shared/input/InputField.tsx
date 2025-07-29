import { Input } from "../../ui/input";
import React from "react";

interface CustomInputFieldProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  className?: string;
  iconClassName?: string;
  icon?: React.ElementType;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  placeholder?: string;
  type?: string;
  register?: any;
  error?: string;
  multiline?: boolean;
}

const InputField = <T extends Record<string, any>>({
  id,
  label,
  className,
  iconClassName,
  icon: Icon,
  leftIcon,
  rightIcon,
  placeholder,
  type = "text",
  register,
  error,
  multiline,
  ...props
}: CustomInputFieldProps<T>): React.ReactElement => {
  return (
    <div className="flex flex-col items-start gap-1 w-full">
      {label && <label className="text-[12px] text-[#3b3a3a]">{label}</label>}
      <div className="relative w-full">
        {(leftIcon || Icon) && (
          <div className="absolute left-[17px] top-1/2 -translate-y-1/2 text-[#3b3a3a]">
            {leftIcon
              ? leftIcon
              : Icon && <Icon className={`w-5 h-5 ${iconClassName}`} />}
          </div>
        )}

        {multiline ? (
          <textarea
            id={id}
            placeholder={placeholder}
            {...register?.(id)}
            className={`${leftIcon || Icon ? "pl-12 pr-12" : "pl-4 pr-4"}
              text-[14px] pl-3 pt-3 h-28 !w-full rounded-lg border focus:!ring-0 placeholder:text-[14px] resize-none ${
                error ? "border-red-500" : "border-gray-200"
              } ${className}`}
            {...props}
          />
        ) : (
          <Input
            type={type}
            placeholder={placeholder}
            {...register?.(id)}
            className={`${leftIcon || Icon ? "pl-12 pr-12" : "pl-4 pr-4"}
              h-12 !w-full rounded-lg border focus:!ring-0 placeholder:text-[14px] ${
                error ? "border-red-500" : "border-gray-200"
              } ${className}`}
            {...props}
          />
        )}
        {rightIcon && (
          <div className="absolute right-[17px] top-1/2 -translate-y-1/2 text-[#3b3a3a] cursor-pointer">
            {rightIcon}
          </div>
        )}
      </div>
      {error && <span className="text-red-500 !text-[12px]">{error}</span>}
    </div>
  );
};

export default InputField;
