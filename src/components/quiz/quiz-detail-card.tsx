"use client";

import { formatHumanReadableDateTime } from "@/lib/utils";
import { paths } from "@/routes/path";
import { Share2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const QuizDetailCard = ({ data, userRole }: any) => {
  const router = useRouter();

  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden transition duration-300 transform hover:scale-[1.01] cursor-pointer"
      onClick={() => router.push(`${paths.quiz_management.view}/${data._id}`)}
    >
      {/* Banner Section */}
      <div className="w-full  relative">
        <div className="relative h-[120px] overflow-hidden rounded-t-xl">
          <div className="-mt-6 -mb-6 h-[calc(100%+3rem)] w-full">
            {data?.image && (
              <img
                src={process.env.NEXT_PUBLIC_SERVER_URL_IMAGE + data?.image}
                alt="Quiz Banner"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>

        {/* Top Left Badge */}
        <div className="absolute top-3 left-3 bg-[#FFFFFF57] text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center z-10">
          <img
            src={"/images/userIcon.svg"}
            alt="user icon"
            className="mr-1 w-[12px]"
          />{" "}
          {data.joiningPlayer} Joining
        </div>

        {/* Top Right Icon */}
        <div className="absolute top-3 right-3 bg-[#FFFFFF57] text-white text-xs font-semibold p-2 rounded-full flex items-center z-10 hover:scale-110 transition-all duration-300">
          <Share2 className="h-3 w-3 text-white" />
        </div>

        {/* Centered Logo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <img src="/images/logo.png" className="w-30" alt="Logo" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-3">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[14px] font-semibold text-gray-800 text-ellipsis overflow-hidden line-clamp-1">
              {data.title}
            </div>
            <div className="flex">
              <img
                src={"/images/clock.png"}
                alt="user icon"
                className="w-[14px] object-contain mr-1"
              />
              <p className="text-xs font-medium text-[#707070] mt-1">
                {formatHumanReadableDateTime(data.date, data.time)}
              </p>
            </div>
          </div>
          {userRole === "admin" && (
            <div className="flex justify-end w-[50px]">
              <button
                className="text-gray-500 hover:text-gray-700 hover:scale-125 transition-all duration-300 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`${paths.quiz_management.edit(data?._id ?? "")}`);
                }}
              >
                <img
                  src={"/images/edit.svg"}
                  alt="user icon"
                  className="w-[16px]"
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizDetailCard;
