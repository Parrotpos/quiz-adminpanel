"use client";

import { UseFormReturn } from "react-hook-form";
import { QuestionCard } from "./question-card";
import { Plus, Minus } from "lucide-react";
import GradientTitle from "@/components/shared/gradient/gradient-title";

interface QuestionsSectionProps {
  form: UseFormReturn<QuizFormValues>;
  hideTitle?: boolean;
}

export function QuestionsSection({ form, hideTitle }: QuestionsSectionProps) {
  const { setValue, getValues, watch } = form;

  const addQuestion = () => {
    const questions = getValues("questions") || [];
    const newQuestion = {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      isHidden: false,
    };
    setValue("questions", [...questions, newQuestion]);
  };

  const removeQuestion = (index: number) => {
    const questions = getValues("questions");
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setValue("questions", newQuestions);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {!hideTitle && (
        <div className="pb-2">
          <GradientTitle title="Questions" />
        </div>
      )}
      <div className="p-5">
        <div className="flex flex-col overflow-hidden">
          <div className="!max-h-[calc(100dvh-300px)] overflow-y-auto pr-2 !flex-1">
            {watch()?.questions?.map((_, index: number) => (
              <div key={index} className="relative pb-3">
                <QuestionCard
                  index={index}
                  form={form}
                  onRemove={removeQuestion}
                />
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={addQuestion}
          className="w-full mt-2 py-3 border-[1px] border-dashed border-gray-300 rounded-md flex items-center justify-center gap-2 text-gray-600 transition-colors cursor-pointer hover:bg-gray-100"
        >
          <Plus className="h-4 w-4" />
          <span>Add Question</span>
        </button>
      </div>
    </div>
  );
}
