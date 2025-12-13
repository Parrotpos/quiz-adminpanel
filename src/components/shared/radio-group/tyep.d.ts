interface Option {
  label: string;
  value: string;
}

interface RadioGroupFieldProps {
  id: string;
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (value: "unlimited" | "restricted") => void;
  error?: string;
  className?: string;
  variant?: "row" | "col";
}
