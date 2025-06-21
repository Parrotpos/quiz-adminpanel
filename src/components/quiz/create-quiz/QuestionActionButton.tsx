"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { differenceInSeconds } from "date-fns";
import { Clock } from "lucide-react";
import moment from "moment";
import GradientButton from "@/components/molecules/gradient-button/gradient-button";

interface QuestionActionButtonProps {
  showDate: string; // UTC Date String
  questionId: string;
  question: any;
  onShowQuestionClick: (id: string) => void;
  onShowAnswerClick: (id: string) => void;
  quizData: any;
}

const QuestionActionButton: React.FC<QuestionActionButtonProps> = ({
  question,
  showDate,
  questionId,
  onShowQuestionClick,
  onShowAnswerClick,
  quizData,
}) => {
  const [diffSeconds, setDiffSeconds] = useState<number>(NaN);
  const [count, setCount] = useState<number>(NaN);

  useEffect(() => {
    if (!showDate) return;

    const start = moment.utc(showDate);
    const totalSeconds = quizData?.questionCountdown || 0;

    // Initial countdown value
    const now = moment.utc();
    const elapsed = now.diff(start, "seconds");
    const remaining = Math.max(0, totalSeconds - elapsed);
    setCount(remaining);

    const interval = setInterval(() => {
      setCount((prevCount) => {
        if (prevCount <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showDate, quizData?.questionCountdown]);

  const isNaNTime = isNaN(count);
  if (question.isShow && question.isShowAnswer) {
    // console.log("Bane true", questionId);
    return null;
  }
  //   console.log(
  //     "isNaNTime: ",
  //     question,
  //     questionId,
  //     question.isShow,
  //     question.isShowAnswer,
  //     isNaNTime,
  //     underTenSeconds,
  //     tenOrMoreSeconds
  //   );

  console.log("Countdown: ", count);
  return (
    <div className="flex flex-col gap-3">
      {!question.isShow && !question.isShowAnswer && (
        <GradientButton
          fromGradient="from-[#71D561]"
          toGradient="to-[#00A32E]"
          className="text-white px-4 h-[30px] text-[12px]"
          onClick={() => onShowQuestionClick(questionId)}
        >
          Show Question
        </GradientButton>
      )}

      {count > 0 && (
        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{count}s</span>
        </div>
      )}

      {count <= 0 && (
        <Button
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-6"
          onClick={() => onShowAnswerClick(questionId)}
        >
          Show Answer
        </Button>
      )}
    </div>
  );
};

export default QuestionActionButton;
