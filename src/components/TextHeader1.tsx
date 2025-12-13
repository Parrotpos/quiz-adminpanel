import React from "react";

const TextHeader1 = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-between items-center mx-2">
      <div className="relative w-full bg-[#f1f6fa] rounded-[5px]">
        <img
          src={"/images/QuizOverviewStrip.svg"}
          alt={"QuizOverviewStrip"}
          className="h-5 absolute left-0 top-1.5"
        />
        <div className="text-md font-semibold text-gray-900 p-1 ml-3">
          {title}
        </div>
      </div>
    </div>
  );
};

export default TextHeader1;
