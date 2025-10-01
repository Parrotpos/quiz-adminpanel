"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import LockRoomModal from "../lock-room-modal";
import { getSocket } from "@/lib/socket";
import useQuizSocket from "@/hooks/useQuizSocket";
import QuestionCard from "../create-quiz/QuestionCard";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import WinnerPopup from "../create-quiz/winner-popup";
import WinnerSelectionPopup from "./winner-selection-popup";
import GradientTitle from "@/components/shared/gradient/gradient-title";
import GradientButton from "@/components/molecules/gradient-button/gradient-button";
import Link from "next/link";
import TextHeader1 from "@/components/TextHeader1";
import { setQuizWinners } from "@/api-service/quiz.service";

export default function QuizDetail({ id }: { id: string }) {
  const socket = getSocket();
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: string;
  }>({});
  const [lockRoomModalOpen, setLockRoomModalOpen] = useState(false);
  const [winnerSelectionOpen, setWinnerSelectionOpen] = useState(false);
  const [quizData, setQuizData] = useState<any>({});

  const [totalQuestions, setTotalQuestions] = useState<number>(0);
  const [joinPlayers, setJoinPlayers] = useState<number>(0);
  const [activePlayers, setActivePlayers] = useState<number>(0);
  const [eliminatedPlayers, setEliminatedPlayers] = useState<number>(0);
  const [winnerList, setWinnerList] = useState<any[]>([]);
  const [topUsers, setTopUsers] = useState<any[]>([]);
  const [lstQuestion, setLstQuestion] = useState<any[]>([]);
  const [isShowCount, setIsShowCount] = useState(0);

  const router = useRouter();

  useQuizSocket(
    id,
    setQuizData,
    setTotalQuestions,
    setJoinPlayers,
    setActivePlayers,
    setEliminatedPlayers,
    setTopUsers,
    setLstQuestion,
    setWinnerList
  );

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const onShowQuestionClick = async (questionId: string) => {
    socket.emit("show_question", {
      quizId: id,
      questionId: questionId,
    });
    // const moderatorRes = (await showQuestion({
    //   quizId: id,
    //   questionId: questionId,
    // })) as IDefaultResponse;
    // console.log("moderatorRes: ", moderatorRes);
    // if (!moderatorRes.status) {
    //   toast.error(moderatorRes?.message ?? "Moderator created successfully!");
    // } else {
    //   toast.success(moderatorRes?.message ?? "Moderator created successfully!");
    // }
  };

  const onShowAnswerClick = (questionId: string) => {
    socket.emit("show_answer", {
      quizId: id,
      questionId: questionId,
    });

    console.log("onShowAnswerClick: ", id);
  };
  const onLeaveQuiz = () => {
    try {
      socket.emit("leave_quiz", {
        quizId: id,
      });
      console.log("call leave");
      router.push("/quiz-management");
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const onCompleteQuiz = () => {
    if (winnerList.length > 0 || lstQuestion.length === 0) return;
    // Open winner selection popup instead of directly completing
    setWinnerSelectionOpen(true);
  };

  const handleWinnersSelected = async (winnerIds: string[]) => {
    try {
      // Call the winner API with selected participant IDs
      const response = await setQuizWinners({
        quizId: id,
        participantIds: winnerIds,
      });

      console.log("Winners set successfully:", response);

      // Complete the quiz after setting winners
      socket.emit("complete_quiz", {
        quizId: id,
      });
    } catch (error) {
      console.error("Error setting winners:", error);
      // You can add toast notification here for error handling
    }
  };
  const onHide = (questionId: string) => {
    socket.emit("hide_question", {
      quizId: id,
      questionId: questionId,
    });

    console.log("onShowAnswerClick: ", id);
  };

  useEffect(() => {
    const count = lstQuestion?.filter((q) => q.isShow).length;
    setIsShowCount(count);
  }, [lstQuestion]); // <- Run when lstQuestion changes

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-3">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold text-gray-900">Quiz Details</h1>
          <div className="flex gap-3">
            <GradientButton
              fromGradient="from-[#71D561]"
              toGradient="to-[#00A32E]"
              className="text-white px-6 cursor-pointer"
              onClick={() =>
                router.push(paths.quiz_management.add_question(id))
              }
              disabled={winnerList.length > 0 || lstQuestion?.length <= 0}
            >
              Add Question
            </GradientButton>
            <GradientButton
              className="text-white px-6"
              onClick={() => setLockRoomModalOpen(true)}
            >
              Lock Room
            </GradientButton>
          </div>
        </div>

        {/* Quiz Overview - Full Width */}
        <Card className="bg-white shadow-sm mb-6 w-full">
          <TextHeader1 title="Quiz Overview" />
          {/* <CardHeader className="">
          </CardHeader> */}
          <CardContent>
            <div className="grid grid-cols-7 gap-3 text-xs mb-4">
              <div>
                <p className="text-gray-600 mb-1">Quiz Title:</p>
                <div className="relative group w-full max-w-full">
                  <p className="font-medium line-clamp-2 break-all">
                    {quizData?.title}
                  </p>

                  {/* Custom Tooltip */}
                  <div className="absolute z-10 top-full left-0 mt-1 hidden group-hover:block bg-black text-white text-xs rounded-md px-2 py-1 w-[300px] max-w-[calc(100vw-2rem)] whitespace-pre-wrap break-words overflow-hidden break-all">
                    {quizData?.title}
                  </div>
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Prize Pool:</p>
                <p className="font-medium">{quizData?.quizPrice}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Total Questions:</p>
                <p className="font-medium">{totalQuestions}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Joining Players:</p>
                <p className="font-medium">{joinPlayers}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Active Players:</p>
                <p className="font-medium">{activePlayers}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Eliminated Players:</p>
                <p className="font-medium">{eliminatedPlayers}</p>
              </div>
              <div>
                <p className="text-gray-600 mb-1">Top 5 Players:</p>
                <div className="flex -space-x-2">
                  {topUsers.length
                    ? topUsers.map((player) => (
                        <img
                          key={player.userId}
                          src={player.pic || "/images/user.jpg"}
                          alt={player.username}
                          className="w-8 h-8 rounded-full border-2 border-white"
                        />
                      ))
                    : "-"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Area - 70% Questions + 30% Announcement */}
        <div className="flex gap-6">
          {/* Questions Section - 70% */}
          <div className="w-full lg:w-[70%] space-y-4">
            {lstQuestion?.length > 0 &&
              lstQuestion.map((question: any, index: number) => {
                return (
                  <QuestionCard
                    key={index}
                    question={question}
                    selectedAnswers={selectedAnswers}
                    onAnswerSelect={handleAnswerSelect}
                    onShowQuestionClick={onShowQuestionClick}
                    onShowAnswerClick={onShowAnswerClick}
                    onHide={onHide}
                    quizData={quizData}
                    questionNo={index + 1}
                    winnerList={winnerList}
                  />
                );
              })}
          </div>

          {/* Announcement Section - 30% (Sticky) */}
          <div className="w-full lg:w-[30%]">
            <div className="sticky top-6">
              <Card className="bg-white shadow-sm">
                {/* <CardHeader className=""> */}
                <div className="flex items-center gap-4 overflow-x-auto p-3">
                  {/* Question Number Indicators */}
                  <div className="flex gap-1">
                    {(() => {
                      const totalQuestions = lstQuestion?.length || 0;
                      const announcements = quizData?.AnnouncementQuiz || [];
                      const totalAnnouncements = announcements.length;

                      const output = [];
                      const chunkSize =
                        totalAnnouncements === 0
                          ? totalQuestions
                          : totalQuestions >= totalAnnouncements
                          ? Math.ceil(totalQuestions / totalAnnouncements)
                          : 1;

                      let annIndex = 0;

                      for (let i = 0; i < totalQuestions; i++) {
                        const num = i + 1;

                        // Add question bubble
                        output.push(
                          <div
                            key={`q-${num}`}
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                              num === isShowCount
                                ? "bg-green-500 text-white"
                                : "bg-gray-100 text-gray-400"
                            }`}
                          >
                            {num < isShowCount ? (
                              <img
                                src="/images/DoneQuestion.svg"
                                alt="Question Done"
                                className="w-full h-full rounded-full border-2 border-white"
                              />
                            ) : (
                              num
                            )}
                          </div>
                        );

                        // Add announcement(s)
                        const shouldInsertAnnouncement =
                          totalAnnouncements > 0 &&
                          ((totalQuestions >= totalAnnouncements &&
                            (num % chunkSize === 0 ||
                              num === totalQuestions)) ||
                            totalQuestions < totalAnnouncements);

                        if (shouldInsertAnnouncement) {
                          const count =
                            totalQuestions >= totalAnnouncements
                              ? 1
                              : Math.ceil(totalAnnouncements / totalQuestions);

                          for (
                            let j = 0;
                            j < count && annIndex < totalAnnouncements;
                            j++
                          ) {
                            output.push(
                              <div
                                key={`a-${annIndex}`}
                                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium bg-gray-100 text-gray-400"
                              >
                                <img
                                  src="/images/Announcement.svg"
                                  alt="Announcement"
                                  className="w-full h-full rounded-full border-2 border-white"
                                />
                              </div>
                            );
                            annIndex++;
                          }
                        }
                      }

                      // Add any remaining announcements
                      while (annIndex < totalAnnouncements) {
                        output.push(
                          <div
                            key={`a-${annIndex}`}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium bg-gray-100 text-gray-400"
                          >
                            <img
                              src="/images/Announcement.svg"
                              alt="Announcement"
                              className="w-full h-full rounded-full border-2 border-white"
                            />
                          </div>
                        );
                        annIndex++;
                      }

                      return output;
                    })()}
                  </div>
                </div>
                {/* </CardHeader> */}
                <div className="text-sm text-gray-600 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                  <div className="flex items-center gap-2">
                    <GradientTitle title="Announcement" parentClass="!mt-0" />
                  </div>
                  <div className="px-3 py-1">
                    {quizData?.AnnouncementQuiz?.length > 0
                      ? quizData?.AnnouncementQuiz.map(
                          (obj: any, idx: number) => {
                            return (
                              <div
                                key={idx}
                                className="bg-[#f5f5f5] p-3 mb-3 rounded-lg"
                              >
                                <p>
                                  <strong className="text-gray-900 text-sm">
                                    {obj?.title}
                                  </strong>
                                </p>
                                <p className="text-xs mt-1">
                                  {obj?.description}
                                </p>
                              </div>
                            );
                          }
                        )
                      : "Not found"}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
        <GradientButton
          className="text-white px-6 mt-5"
          onClick={() => onCompleteQuiz()}
          disabled={winnerList.length > 0 || lstQuestion?.length <= 0}
        >
          Complete quiz
        </GradientButton>
        <GradientButton
          className="text-white px-6 mt-5 ml-3"
          onClick={() => onLeaveQuiz()}
        >
          End quiz
        </GradientButton>
      </div>
      <LockRoomModal
        open={lockRoomModalOpen}
        onOpenChange={setLockRoomModalOpen}
        id={id}
      />

      <WinnerSelectionPopup
        open={winnerSelectionOpen}
        onOpenChange={setWinnerSelectionOpen}
        quizId={id}
        onWinnersSelected={handleWinnersSelected}
      />
    </div>
  );
}
