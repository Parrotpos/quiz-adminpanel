// @ts-nocheck

"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuizDetails } from "./quiz-details";
import { QuestionsSection } from "./questions-section";
import { toast } from "sonner";
import { quizSchema } from "@/utils/schema/quiz.schema";
import GradientButton from "@/components/molecules/gradient-button/gradient-button";
import { createNewQuiz } from "@/api-service/quiz.service";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import Typography from "@/components/ui/typegraphy";
import moment from "moment";

const QuizForm: React.FC<{
  defaultQuizFormValues?: ExtendedQuizFormValues;
  editQuizHandler?: (data: FormData) => Promise<void>;
}> = ({ defaultQuizFormValues, editQuizHandler }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const defaultValues: Partial<QuizFormValues> = {
    title: "",
    date: "",
    time: "",
    joinType: "unlimited",
    maxUsers: 0,
    isFree: false,
    amount: 0,
    quizPrice: 0,
    questionCountdown: 10,
    description: "",
    moderator: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        isHidden: false,
      },
    ],
    questionTypes: "MCQ",
  };

  const form = useForm<Partial<QuizFormValues>>({
    resolver: zodResolver(quizSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (defaultQuizFormValues) {
      form.reset(defaultQuizFormValues);
    }
  }, [defaultQuizFormValues, form]);

  const onSubmit: SubmitHandler<QuizFormValues> = async (data) => {
    setIsSubmitting(true);
    const allVals = form.getValues() as QuizFormValues;
    const actualVals = Object.fromEntries(
      Object.entries(data).map(([key, _value]) => [
        key,
        allVals[key as keyof QuizFormValues],
      ])
    );

    const formData = new FormData();

    Object.entries(actualVals).forEach(([key, value]) => {
      if (key === "time") {
        formData.append("time", moment(value, "HH:mm").utc().format("HH:mm"));
      } else if (key === "date") {
        formData.append("date", moment(value).utc().format("YYYY-MM-DD"));
      } else if (key === "questions") {
        // Send entire questions array as JSON
        formData.append(key, JSON.stringify(value));
      } else if (value instanceof File) {
        formData.append(key, value);
      } else if (Array.isArray(value)) {
        formData.append(key, JSON.stringify(value)); // optional: depends on backend
      } else if (typeof value === "object" && value !== null) {
        formData.append(key, JSON.stringify(value)); // e.g., nested objects
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    });

    if (editQuizHandler) {
      // Edit quiz flow
      await editQuizHandler?.(formData);
      setIsSubmitting(false);
      return;
    }

    try {
      const quizRes = (await createNewQuiz(formData)) as IDefaultResponse;

      if (!quizRes.status) {
        toast.error(quizRes?.message ?? "Quiz created successfully!");
      } else {
        router.push(
          `${paths.quiz_management.schedule(quizRes?.data?.quiz?._id)}`
        );
        toast.success(quizRes?.message ?? "Quiz created successfully!");
        // form.reset();
      }
    } catch (error) {
      toast.error(
        (error as Error)?.message ||
        "Failed to create/update quiz. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col  px-2 pt-2 pb-3 md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <Typography size="lg" className="text-start font-bold">
          Quiz Details
        </Typography>
        <div className="text-[13px] flex justify-around items-start sm:items-center gap-2 flex-col sm:flex-row">
          <span className="font-bold">Create Quiz /</span> Quiz Management
        </div>
      </div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="h-full">
            <QuizDetails form={form} />
          </div>
          <div className="h-full">
            <QuestionsSection form={form} />
          </div>
        </div>

        <div className="mt-8">
          <GradientButton
            className="w-36"
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
          >
            {isSubmitting
              ? editQuizHandler
                ? "Updating.."
                : "Creating..."
              : editQuizHandler
                ? "Update"
                : "Next"}
          </GradientButton>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;
