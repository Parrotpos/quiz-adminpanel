// components/common/CommonSelect.tsx

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const SelectField: React.FC<CommonSelectProps> = ({
  placeholder = "Select an option",
  label,
  value,
  onChange,
  options,
  className = "",
  disabled = false,
  error,
}) => {
  return (
    <div className="space-y-1">
      {label && <Label className="text-sm text-[#3b3a3a]">{label}</Label>}
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          className={`!h-10 w-full focus:!ring-0 ${className} ${error ? "border-red-500" : ""}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {label && <SelectLabel>{label}</SelectLabel>}
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default SelectField;
