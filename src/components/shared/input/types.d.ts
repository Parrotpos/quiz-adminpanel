import { LucideIcon } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

declare global {
  interface CustomInputFieldProps<T extends Record<string, any>> {
    name?: string;
    id: string;
    label?: string;
    className?: string;
    iconClassName?: string;
    icon?: LucideIcon;
    rightIcon?: React.ReactNode;
    placeholder?: string;
    type?: string;
    register?: UseFormRegister<T>;
    error?: FieldError;
    leftIcon?: React.ReactNode;
  }
}
