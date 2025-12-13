interface CommonSelectProps {
  placeholder?: string;
  label?: string;
  value?: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  className?: string;
  disabled?: boolean;
  error?: string;
}