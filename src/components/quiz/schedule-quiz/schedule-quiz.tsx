import React from "react";
import ScheduleQuizForm from "./schdule-quiz-form";
import Typography from "@/components/ui/typegraphy";

const ScheduleQuiz: React.FC<CommonQuizProps> = ({ quizId }) => {
  return (
    <div className="h-full mx-2">
      <div className="flex flex-col pt-2 pb-3 md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <Typography size="lg" className="text-start font-bold">
          Schedule Quiz
        </Typography>
        <div className="text-[13px] flex justify-around items-start sm:items-center gap-2 flex-col sm:flex-row">
          <span className="font-bold">Schedule Quiz /</span> Quiz Management
        </div>
      </div>{" "}
      <ScheduleQuizForm quizId={quizId} />
    </div>
  );
};

export default ScheduleQuiz;
