// @ts-nocheck
"use client";

import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import debounce from "lodash/debounce";
import QuizDetailCard from "./quiz-detail-card";
import Typography from "../ui/typegraphy";
import GradientButton from "../molecules/gradient-button/gradient-button";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import { getQuizList, getVisibilityQuiz, setVisibilityQuiz } from "@/api-service/quiz.service";
import { Input } from "../ui/input";
import AssignModeratorPopup from "./create-quiz/assign-moderator-popup";
import moment from "moment";
import { currentDateToUTC } from "@/lib/utils";
import { useBoolean } from "@/hooks/useBoolean";
import DashboardSkeleton from "../shared/skeleton/dashboard-skeleton";
import NoDataFound from "../shared/not-found/no-data-found";
import InputField from "../shared/input/InputField";
import { Search, X } from "lucide-react";
import Link from "next/link";
import QuizDetailHistoryCard from "./quiz-detail-history-card";
import { getCookie } from "@/utils/server/server-util";
import { Switch } from "../ui/switch";
import { toast } from "sonner";

const QuizComponent = () => {
  const router = useRouter();
  const [quizListData, setQuizListData] = useState<any>([]);
  const [isQuizVisible, setIsQuizVisible] = useState<boolean>(false);
  const [quizHistoryData, setQuizHistoryData] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const loadingBool = useBoolean(true);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
    fetchUserRole();
  }, []);
  const fetchUserRole = async () => {
    const authObj = await getCookie();
    authObj?.userRole && setUserRole(authObj?.userRole);
    authObj?.userId && setUserId(authObj?.userId);
  };

  const onload = useCallback(async () => {
    const authObj = await getCookie();
    loadingBool.onTrue();
    const res = await getVisibilityQuiz()
    console.log(res, "res")
    if (res?.isEnabled) {
      setIsQuizVisible(res?.isEnabled)
    }
    const quizRes = (await getQuizList({
      search: searchTerm,
      date: currentDateToUTC(),
      moderatorId: authObj?.userId ?? userId,
    })) as any;

    setQuizListData(quizRes?.data?.upcoming);
    setQuizHistoryData(quizRes?.data?.history);
    loadingBool.onFalse();
  }, [searchTerm, userId]);

  useEffect(() => {
    const handler = debounce(() => {
      onload();
    }, 300);

    handler();

    return () => handler.cancel();
  }, [searchTerm]);

  const changeVisiblityOfQuiz = async (checked) => {
    const response = await setVisibilityQuiz(checked);
    console.log("response: ", response)
    if (response?.data?.data) {
      setIsQuizVisible(response?.data?.data?.isEnabled)
      toast.success(
        response.data?.message
      );
    }
  }
  return (
    <div className="flex flex-col flex-[0_0_auto] space-y-4 my-2 mx-3">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <Typography size="lg" className="text-start font-bold">
          Upcoming Quiz
        </Typography>
        <div className="flex justify-around items-start sm:items-center gap-2 flex-col sm:flex-row">
          <div>
            <div className="flex text-[15px] gap-3 item-center">
              <Switch
                checked={isQuizVisible}
                onCheckedChange={(checked) => {
                  changeVisiblityOfQuiz(checked)
                  // setValue("isFree", checked, {
                  //   shouldValidate: true,
                  //   shouldTouch: true,
                  //   shouldDirty: true,
                  // });
                  // // Clear amount when switching to free
                  // if (checked) {
                  //   setValue("amount", 0);
                  // }
                }}
              />
              <div>
                Is visible quiz?
              </div>
            </div>
          </div>
          <div className="relative w-full sm:w-[400px] bg-white rounded-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <InputField
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-9 w-full" // ensure InputField fills parent width
              rightIcon={
                searchTerm ? (
                  <X
                    className="w-4 h-4 text-gray-400 cursor-pointer"
                    onClick={() => setSearchTerm("")}
                  />
                ) : null
              }
            />
          </div>
          {userRole === "admin" && (
            <AssignModeratorPopup>
              <GradientButton
                fromGradient="from-[#71D561]"
                toGradient="to-[#00A32E]"
              >
                View Moderator
              </GradientButton>
            </AssignModeratorPopup>
          )}

          {userRole === "admin" && (
            <Link color="inherit" href={paths.quiz_management.create}>
              <GradientButton>Create Quiz</GradientButton>
            </Link>
          )}
        </div>
      </div>
      {loadingBool.bool ? (
        <DashboardSkeleton />
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-6 mb-10">
            {quizListData?.length > 0 ? (
              quizListData.map((data: any, index: number) => (
                <Fragment key={index}>
                  <QuizDetailCard data={data} userRole={userRole} />
                </Fragment>
              ))
            ) : (
              <NoDataFound description="No Upcoming quiz available." />
            )}
          </div>
          <div className="space-y-4">
            <Typography size="lg" className="text-start">
              Quiz History
            </Typography>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {quizHistoryData?.length > 0 ? (
                quizHistoryData.map((data: any, index: number) => (
                  <Fragment key={index}>
                    <QuizDetailHistoryCard data={data} />
                  </Fragment>
                ))
              ) : (
                <NoDataFound description="No quiz history available." />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizComponent;
