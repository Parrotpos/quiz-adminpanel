"use client";

import { paths } from "@/routes/path";
import {
  ArrowLeft,
  ArrowRight,
  ArrowRightIcon,
  ChevronRight,
} from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const QuizDetailHistoryCard = ({ data }: any) => {
  const router = useRouter();

  return (
    <Link color="inherit" href={`${paths.quiz_management.view}/${data._id}`}>
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 transform hover:scale-[1.01] cursor-pointer"
        onClick={() => router.push(`${paths.quiz_management.view}/${data._id}`)}
      >
        {/* Banner Section */}
        <div className="w-full  relative">
          <div className="relative h-[120px] overflow-hidden rounded-t-xl">
            <div className="-mt-6 -mb-6 h-[calc(100%+3rem)] w-full">
              <img
                src={
                  process.env.NEXT_PUBLIC_SERVER_URL_IMAGE + data?.image ||
                  "/images/quiz-bg.png"
                }
                alt="Quiz Banner"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Centered Logo */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <img src="/images/logo.png" className="w-30" alt="Logo" />
          </div>
        </div>

        {/* Content Section */}
        <div className="p-2.5">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-[16px] font-bold text-gray-800">
                {data.title}
              </div>
            </div>
            <div className="text-[15px]">
              Prize amt:{" "}
              <span className="font-bold text-transparent bg-gradient-to-b from-[#8ABB2A] to-[#3C9B36] bg-clip-text">
                {data.quizPrice}
              </span>
            </div>
          </div>
          <div className="flex justify-between text-xs mt-2">
            <div>
              <div className="text-[#4D4B4B]">Date</div>
              <div className="font-bold">
                {moment(data.date).format("YYYY-MM-DD")}
              </div>
            </div>
            <div>
              <div className="text-[#4D4B4B]">Total Que.</div>
              <div className="font-bold">{data.totalQuestions}</div>
            </div>
            <div>
              <div className="text-[#4D4B4B]">Winner</div>
              <div className="font-bold flex items-center">
                {`${data.winnerCount} Winners`}{" "}
                <ChevronRight
                  className="h-5 w-5 font-extralight"
                  color="gray"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuizDetailHistoryCard;
