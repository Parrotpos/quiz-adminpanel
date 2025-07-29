"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { getQuizDetail } from "@/api-service/quiz.service";
import AddQuizQuestions from "./add-quiz-questions";
import { useBoolean } from "@/hooks/useBoolean";
import AddQuestionsSkeleton from "@/components/shared/skeleton/add-questions-skeleton";

type EditQuizProps = {
  quizId: string;
};

const AddQuizQuestion = ({ quizId }: EditQuizProps) => {
  const [quizData, setQuizData] = useState<ExtendedQuizFormValues>({});

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

  return loadingBool.bool ? (
    <AddQuestionsSkeleton />
  ) : (
    <div className="max-w-2xl p-4">
      <AddQuizQuestions quizData={quizData} quizId={quizId} />
    </div>
  );
};

export default AddQuizQuestion;
