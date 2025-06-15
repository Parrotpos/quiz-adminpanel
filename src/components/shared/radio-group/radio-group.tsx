import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  error,
  className,
  variant = "row",
}) => {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <RadioGroup
        value={value}
        onValueChange={onChange}
        className={`!flex gap-4 ${
          variant === "row" ? "flex-row items-center" : "flex flex-col"
        }`}
      >
        {options.map((opt) => (
          <div key={opt.value} className="flex items-center space-x-2">
            {/* <RadioGroupItem value={opt.value} id={`${id}-${opt.value}`} /> */}
            <RadioGroupItem
              value={opt.value}
              id={`${id}-${opt.value}`}
              className={`
                w-5 h-5 border-[1px] border-gray-300 transition-all duration-100 ease-in-out 
                data-[state=checked]:border-[#0E76BC] cursor-pointer
            `}
            />

            <Label
              htmlFor={`${id}-${opt.value}`}
              className="!font-normal text-[13px] cursor-pointer"
            >
              {opt.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
      {error && <span className="text-red-500 text-[12px]">{error}</span>}
    </div>
  );
};

export default RadioGroupField;
