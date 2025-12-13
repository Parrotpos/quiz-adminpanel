"use client";

import React, { useEffect, useState } from "react";
import QuizForm from "./quiz-form";
import { toast } from "sonner";
import {
  createNewQuiz,
  editQuiz,
  getQuizDetail,
} from "@/api-service/quiz.service";
import { useBoolean } from "@/hooks/useBoolean";
import EditQuizSkeleton from "@/components/shared/skeleton/edit-quiz-skeleton";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import { ArrowLeft } from "lucide-react";

type EditQuizProps = {
  quizId: string;
};

const EditQuiz = ({ quizId }: EditQuizProps) => {
  const [quizData, setQuizData] = useState<ExtendedQuizFormValues>({});
  const router = useRouter();
  const loadingBool = useBoolean();

  useEffect(() => {
    onload();
  }, []);

  const onload = async () => {
    loadingBool.onTrue();
    const quizRes = (await getQuizDetail(quizId)) as IQuizDetailApiRes;

    if (!quizRes.status) {
      toast.error(quizRes?.message || "Failed to get quiz details");
    }

    setQuizData(quizRes.data?.data);
    loadingBool.onFalse();
  };

  const editQuizHandler = async (formData: FormData) => {
    formData.append("questionTypes", "MCQ");

    const editQuizRes = (await editQuiz(formData, quizId)) as IDefaultResponse;

    if (!editQuizRes.status) {
      toast.error(editQuizRes?.message ?? "Quiz created successfully!");
    } else {
      router.push(paths.quiz_management.root);
    }
  };

  return loadingBool.bool ? (
    <EditQuizSkeleton />
  ) : (
    <>
      {/* <button
        onClick={() => router.back()}
        className="flex items-center space-x-1 text-sm font-medium text-gray-600 hover:text-black transition my-3 bg-gray-200 px-4 py-2 rounded-md !w-fit cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back</span>
      </button> */}
      <QuizForm
        defaultQuizFormValues={
          quizData
            ? {
                ...quizData,
                date: quizData?.scheduledDate ?? "",
                image: quizData?.image || "",
                isFree: quizData?.isFree ?? false,
                amount: quizData?.amount ?? 0,
              }
            : {}
        }
        editQuizHandler={editQuizHandler}
      />
    </>
  );
};

export default EditQuiz;
