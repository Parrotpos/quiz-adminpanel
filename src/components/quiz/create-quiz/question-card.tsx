"use client";

import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Trash, Plus, Info, Minus, Trash2, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import InputField from "@/components/shared/input/InputField";
import { Checkbox } from "@/components/ui/checkbox";

interface QuestionCardProps {
  index: number;
  form: UseFormReturn<QuizFormValues>;
  onRemove: (index: number) => void;
}

export function QuestionCard({ index, form, onRemove }: QuestionCardProps) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;
  const correctAnswer = watch(`questions.${index}.correctAnswer`);
  const options = watch(`questions.${index}.options`) || ["", "", "", ""];

  const handleAddOption = () => {
    if (options.length === 4) return;
    const currentOptions = [...options];
    currentOptions.push("");
    setValue(`questions.${index}.options`, currentOptions);
  };

  const handleRemoveOption = (optionIndex: number) => {
    const currentOptions = [...options];
    currentOptions.splice(optionIndex, 1);
    setValue(`questions.${index}.options`, currentOptions);

    // Update correctAnswer if needed
    if (correctAnswer === optionIndex) {
      setValue(`questions.${index}.correctAnswer`, 0);
    } else if (correctAnswer > optionIndex) {
      setValue(`questions.${index}.correctAnswer`, correctAnswer - 1);
    }
  };

  const handleSetCorrectAnswer = (optionIndex: number) => {
    setValue(`questions.${index}.correctAnswer`, optionIndex);
  };

  return (
    <div className="bg-gray-50 border rounded-md p-4 space-y-2">
      <div className="flex items-end justify-between mb-1">
        <div className="flex flex-col items-start">
          <div className="text-xs">Question {index + 1}</div>
          {errors.questions?.[index] && (
            <div className="text-xs text-destructive flex items-center gap-1">
              <Info className="h-3 w-3" />
              <span>Please complete this question</span>
            </div>
          )}
        </div>
        {index !== 0 && (
          <Button
            type="button"
            onClick={() => onRemove(index)}
            className="p-1 text-red-500 hover:!bg-red-100 rounded-md !bg-white cursor-pointer"
          >
            <Minus className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-1 my-3">
        <div className="relative w-full">
          <div
            className={
              errors.questions?.[index]?.question?.message
                ? "bg-[#C1C1C140] transform -translate-y-1/2 absolute left-1 top-[23px] z-10 p-3 rounded-lg"
                : "bg-[#C1C1C140] transform -translate-y-1/2 absolute left-1 top-1/2 z-10 p-3 rounded-lg"
            }
          >
            <HelpCircle className="text-black w-4 h-4" />
          </div>
          <InputField
            id={`questions.${index}.question`}
            name={`questions.${index}.question`}
            register={register}
            placeholder="Enter Question"
            error={errors.questions?.[index]?.question?.message}
            className="pl-12 bg-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {options.map((_: any, optionIndex: number) => (
          <div key={optionIndex} className="mb-1">
            <div className="flex justify-between mb-1">
              <label className="text-xs text-gray-600">
                Option {optionIndex + 1}
              </label>
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="flex items-center gap-2 w-full border rounded-md p-2 bg-white">
                <div className="relative">
                  <Checkbox
                    checked={correctAnswer === optionIndex}
                    onCheckedChange={() => handleSetCorrectAnswer(optionIndex)}
                    className="w-4 h-4 !border-gray-400 ml-1"
                  />

                  {correctAnswer === optionIndex && (
                    <img
                      src="/images/check-icon.svg" // your checked image
                      alt="Checked"
                      className="absolute top-[3px] left-[4px] w-4 h-4"
                    />
                  )}
                </div>

                <InputField
                  id={`questions.${index}.options.${optionIndex}`}
                  name={`questions.${index}.options.${optionIndex}`}
                  register={register}
                  placeholder={`Option ${optionIndex + 1}`}
                  // error={errors.questions?.[index]?.options?.[optionIndex]?.message}
                  className="h-8 !border-0 !pl-0 !shadow-none bg-white"
                />
              </div>
              {options.length === 4 || optionIndex !== options.length - 1 ? (
                <div
                  className="p-2 border rounded-md bg-white hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleRemoveOption(optionIndex)}
                >
                  <img
                    src="/images/trash.svg" // your checked image
                    alt="Checked"
                    className="h-full"
                  />
                </div>
              ) : (
                <div
                  className="p-2 border rounded-md bg-white hover:bg-gray-200 cursor-pointer"
                  onClick={handleAddOption}
                >
                  <Plus className="w-full h-full text-black !cursor-pointer" />
                </div>
              )}
            </div>
            {errors.questions?.[index]?.options?.[optionIndex] && (
              <p className="text-xs text-destructive mt-1 ml-2">
                {errors.questions?.[index]?.options?.[optionIndex]?.message}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* {options.length < 6 && (
        <button
          type="button"
          onClick={handleAddOption}
          className="flex items-center gap-1 text-sm text-primary hover:underline mt-2"
        >
          <Plus className="h-3 w-3" />
          <span>Add Option</span>
        </button>
      )} */}
    </div>
  );
}
