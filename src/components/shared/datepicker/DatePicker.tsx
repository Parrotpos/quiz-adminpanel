"use client";

import React, { useState } from "react";
import { CalendarDays } from "lucide-react";
import moment from "moment";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { UseFormSetValue } from "react-hook-form";

interface CustomDatePickerProps {
  id: string;
  label?: string;
  className?: string;
  error?: string;
  placeholder?: string;
  value?: Date | string;
  setValue?: UseFormSetValue<any>;
  minDate?: Date;
}

const DatePicker: React.FC<CustomDatePickerProps> = ({
  id,
  label,
  className,
  error,
  value,
  setValue,
  minDate,
  placeholder = "Select",
}) => {
  const [open, setOpen] = useState(false);

  // inside handleSelect
  const handleSelect = (date: Date | undefined) => {
    if (date && setValue) {
      const formattedDate = moment(date).format("YYYY-MM-DD"); // 💡 required format
      setValue(id, formattedDate, { shouldValidate: true });
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-start gap-1 w-full">
      {label && (
        <Label className="text-[12px] text-[#3b3a3a] !font-normal">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`h-12 w-full justify-between text-left rounded-lg !font-normal text-[14px] text-[#000] ${
              error ? "border-red-500" : "border-gray-200"
            } ${className}`}
          >
            {value ? moment(value).format("DD MMM YYYY") : placeholder}
            <CalendarDays className="ml-2 h-4 w-4 text-muted-foreground" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value ? moment(value, "YYYY-MM-DD").toDate() : undefined}
            onSelect={handleSelect}
            captionLayout="dropdown"
            disabled={(date) => {
              if (!minDate) return false;
              // Disable all dates before minDate (set time to 00:00:00 for both)
              const d = new Date(date);
              d.setHours(0, 0, 0, 0);
              const min = new Date(minDate);
              min.setHours(0, 0, 0, 0);
              return d < min;
            }}
          />
        </PopoverContent>
      </Popover>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};

export default DatePicker;
