"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, UserX, Eye, MousePointer } from "lucide-react";
import QuestionActionButton from "./QuestionActionButton";

interface QuestionCardProps {
  question: any;
  selectedAnswers: Record<string, string>;
  onAnswerSelect: (questionId: number, answer: string) => void;
  onShowQuestionClick: (questionId: string) => void;
  onShowAnswerClick: (questionId: string) => void;
  onHide: (questionId: string) => void;
  quizData: any;
  questionNo: number;
  winnerList: any[];
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswers,
  onAnswerSelect,
  onShowQuestionClick,
  onShowAnswerClick,
  onHide,
  quizData,
  questionNo,
  winnerList,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  console.log(question, "question: ");
  return (
    <Card
      key={question?._id}
      className={`bg-white shadow-sm relative ${
        !question.isHide &&
        (question.isShow || question.isShowAnswer || question.showDate)
          ? "border-2 border-[#00C951]"
          : "border border-gray-200"
      }`}
      onMouseEnter={() => setHovered(question.id)}
      onMouseLeave={() => setHovered(null)}
    >
      <CardContent className="py-3 px-4">
        <div className="flex justify-between items-start mb-4">
          <span className="font-extrabold">{questionNo}.</span>{" "}
          <h3 className="text-sm font-semibold text-gray-900 flex-1 pr-4 break-all">
            {question.question}
          </h3>
          {!question.isHide && question.isShow && question.isShowAnswer && (
            <Eye
              className="h-5 w-5 text-gray-600 cursor-pointer"
              onClick={() => {
                if (winnerList.length > 0) {
                  // alert("You have already selected the winner for this quiz.");
                  return;
                }
                onHide(question._id);
              }}
            />
          )}
        </div>

        {/* Answer Options */}
        <OptionGrid options={question.options} />

        {/* Statistics and Timer */}
        <div className="flex justify-between items-center bg-[#F5F5F5] p-3 rounded-lg">
          <div className="grid grid-cols-4 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <span className="text-xs font-semibold">User Live</span>
              </div>
              <p className="text-lg font-bold">{question?.userLive}</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <span className="text-xs font-semibold">Eliminated User</span>
              </div>
              <p className="text-lg font-bold">{question?.eliminated}</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <span className="text-xs font-semibold">Viewers</span>
              </div>
              <p className="text-lg font-bold">
                {question?.viewer > 0 ? question.viewer - 1 : 0}
              </p>
            </div>
            {/* <div>
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <span className="text-xs font-semibold">Right Clicks</span>
              </div>
              <p className="text-lg font-bold">{question?.click}</p>
            </div> */}
          </div>

          <div className="flex items-center gap-4">
            <QuestionActionButton
              question={question}
              showDate={question.showDate}
              questionId={question._id}
              onShowQuestionClick={onShowQuestionClick}
              onShowAnswerClick={onShowAnswerClick}
              quizData={quizData}
              winnerList={winnerList}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;

function OptionGrid({ options }: { options: string[] }) {
  // Define a threshold for what is considered a "long" option
  const isAnyOptionLong = options.some((opt) => opt.length > 20); // you can tweak the length
  const gridColsClass = isAnyOptionLong
    ? "grid-cols-1 sm:grid-cols-2"
    : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={`grid ${gridColsClass} gap-3 mb-6`}>
      {options.map((option, index) => (
        <div key={`option${index}`} className="relative group">
          <div className="px-4 py-2 text-sm text-gray-900 border border-gray-200 rounded-full truncate overflow-hidden whitespace-nowrap">
            {option}
          </div>

          {/* Custom Tooltip */}
          <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-1 hidden w-max max-w-xs bg-black text-white text-xs rounded-md px-2 py-1 group-hover:block break-all">
            {option}
          </div>
        </div>
      ))}
    </div>
  );
}
