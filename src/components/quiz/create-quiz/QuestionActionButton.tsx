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
}

const QuestionActionButton: React.FC<QuestionActionButtonProps> = ({
  question,
  showDate,
  questionId,
  onShowQuestionClick,
  onShowAnswerClick,
}) => {
  const [diffSeconds, setDiffSeconds] = useState<number>(NaN);
  const [count, setCount] = useState<number>(NaN);
  console.log("count: ", count);

  useEffect(() => {
    if (!showDate) return;
    const start = moment.utc(showDate).subtract(22, "seconds"); // from BE

    const interval = setInterval(() => {
      const now = moment.utc();
      const diff = now.diff(start, "seconds");

      if (diff < 10) {
        setCount(diff + 1); // show 1 to 10
      } else {
        setCount(10);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [showDate]);
  console.log("showDate: ", showDate);

  const isNaNTime = isNaN(count);
  const underTenSeconds = count >= 0 && count < 10;
  const tenOrMoreSeconds = count >= 10;
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

  console.log("underTenSeconds: ", diffSeconds, underTenSeconds);
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

      {underTenSeconds && (
        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
          <Clock className="w-4 h-4" />
          <span className="text-sm font-medium">{count}s</span>
        </div>
      )}

      {tenOrMoreSeconds && (
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
