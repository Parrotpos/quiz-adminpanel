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
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswers,
  onAnswerSelect,
  onShowQuestionClick,
  onShowAnswerClick,
  onHide,
  quizData,
}) => {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <Card
      key={question?._id}
      className="bg-white shadow-sm relative"
      onMouseEnter={() => setHovered(question.id)}
      onMouseLeave={() => setHovered(null)}
    >
      <CardContent className="py-3 px-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm font-semibold text-gray-900 flex-1 pr-4">
            {question.question}
          </h3>
          {question.isShow && question.isShowAnswer && (
            <Eye
              className="h-5 w-5 text-gray-600 cursor-pointer"
              onClick={() => {
                onHide(question._id);
              }}
            />
          )}
        </div>

        {/* Answer Options */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {question.options.map((option: string, index: number) => (
            <h3
              key={`option${index}`}
              className="px-3 py-2 text-sm text-gray-900 pr-4 border border-gray-200 rounded-full"
            >
              {option}
            </h3>
          ))}
        </div>

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
              <p className="text-lg font-bold">{question?.viewer}</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                <span className="text-xs font-semibold">User Clicks</span>
              </div>
              <p className="text-lg font-bold">{question?.click}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <QuestionActionButton
              question={question}
              showDate={question.showDate}
              questionId={question._id}
              onShowQuestionClick={onShowQuestionClick}
              onShowAnswerClick={onShowAnswerClick}
              quizData={quizData}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
