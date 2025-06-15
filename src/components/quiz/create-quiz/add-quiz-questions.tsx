"use client";

import React from "react";
import { toast } from "sonner";
import { QuestionsSection } from "./questions-section";
import { onlyQuestionsSchema } from "@/utils/schema/quiz.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import GradientButton from "@/components/molecules/gradient-button/gradient-button";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import { useBoolean } from "@/hooks/useBoolean";
import { useSocket } from "@/hooks/useSocket";

type AddQuizQuestionsProps = {
  quizData: ExtendedQuizFormValues;
  quizId: string;
};

const AddQuizQuestions: React.FC<AddQuizQuestionsProps> = ({
  quizData,
  quizId,
}) => {
  const router = useRouter();
  const loadingBool = useBoolean();

  const { connected, emit, once } = useSocket();

  const form = useForm({
    resolver: zodResolver(onlyQuestionsSchema),
    defaultValues: {
      questions: [
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0,
        },
      ],
    },
    mode: "onChange",
  });

  // useEffect(() => {
  //   if (quizData?.questions) {
  //     form.reset({ questions: quizData?.questions });
  //   }
  // }, [quizData?.questions, form]);

  const onSubmit: SubmitHandler<QuizFormValues> = async (
    data: Partial<ExtendedQuizFormValues>
  ) => {
    if (!connected) {
      toast.error("Socket not connected.");
      return;
    }

    loadingBool.onTrue();
    data = {
      ...data,
      quizId: quizId,
      // @ts-ignore
      questions: data?.questions?.map((q) => {
        const { isHidden, ...otherParams } = q;
        return {
          ...otherParams,
        };
      }) as Partial<ExtendedQuizFormValues>,
    };

    emit("add_question", data); // Send form data to backend

    once("add_question", (response) => {
      if (response?.code === 200) {
        router.push(paths.quiz_management.detail + `/${quizId}`);
      } else {
        toast.error(
          response?.error || response?.message || "Failed to add question."
        );
      }
      loadingBool.onFalse();
    });
  };

  return (
    // @ts-ignore
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className="font-bold text-xl text-gray-700 mb-6">Add Questions</div>
      {/* <Card className="p-6"> */}
        {/* @ts-ignore */}
        <QuestionsSection form={form} hideTitle />
      {/* </Card> */}
      <div className="mt-6">
        <div className="flex justify-start space-x-4">
          <button
            type="button"
            className="h-10 w-full sm:w-[200px] px-4 !py-[2px] border border-[#283891] rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm cursor-pointer"
            onClick={() => router.back()}
          >
            Cancel
          </button>
          <GradientButton
            className="w-[200px]"
            type="submit"
            loading={loadingBool.bool}
          >
            ADD
          </GradientButton>
        </div>
      </div>
    </form>
  );
};

export default AddQuizQuestions;
