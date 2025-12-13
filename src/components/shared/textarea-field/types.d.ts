import { UseFormRegister } from "react-hook-form";

declare global {
  interface TextareaFieldProps<T> {
    id: string;
    label?: string;
    className?: string;
    placeholder?: string;
    register?: UseFormRegister<T>;
    error?: string;
    rows?: number;
    [key: string]: any; // for spreading other props
  }
}
