// @ts-nocheck
"use client";

import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import debounce from "lodash/debounce";
import QuizDetailCard from "./quiz-detail-card";
import Typography from "../ui/typegraphy";
import GradientButton from "../molecules/gradient-button/gradient-button";
import { useRouter } from "next/navigation";
import { paths } from "@/routes/path";
import {
  getQuizList,
  getVisibilityQuiz,
  setVisibilityQuiz,
} from "@/api-service/quiz.service";
import { Input } from "../ui/input";
import AssignModeratorPopup from "./create-quiz/assign-moderator-popup";
import moment from "moment";
import { currentDateToUTC } from "@/lib/utils";
import { useBoolean } from "@/hooks/useBoolean";
import DashboardSkeleton from "../shared/skeleton/dashboard-skeleton";
import NoDataFound from "../shared/not-found/no-data-found";
import InputField from "../shared/input/InputField";
import { Search, X, Loader2 } from "lucide-react";
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

  // Pagination states for history
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMoreHistory, setHasMoreHistory] = useState(true);
  const [totalHistoryPages, setTotalHistoryPages] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadingBool = useBoolean(true);
  const [userRole, setUserRole] = useState("");
  const [userId, setUserId] = useState("");
  const historyContainerRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    fetchUserRole();
  }, []);
  const fetchUserRole = async () => {
    const authObj = await getCookie();
    authObj?.userRole && setUserRole(authObj?.userRole);
    authObj?.userId && setUserId(authObj?.userId);
  };

  const onload = useCallback(
    async (resetHistory = true) => {
      const authObj = await getCookie();
      loadingBool.onTrue();

      const res = await getVisibilityQuiz();
      console.log(res, "res");
      if (res?.isEnabled) {
        setIsQuizVisible(res?.isEnabled);
      }

      const pageToFetch = resetHistory ? 1 : currentPage;
      const quizRes = (await getQuizList({
        search: searchTerm,
        date: currentDateToUTC(),
        moderatorId: authObj?.userId ?? userId,
        page: pageToFetch,
        limit: 12,
      })) as any;

      setQuizListData(quizRes?.data?.upcoming);

      if (resetHistory) {
        setQuizHistoryData(quizRes?.data?.history);
        setCurrentPage(1);
      } else {
        setQuizHistoryData((prev) => [...prev, ...quizRes?.data?.history]);
      }

      // Update pagination info
      if (quizRes?.data?.pagination) {
        setTotalHistoryPages(quizRes.data.pagination.historyTotalPages);
        setHasMoreHistory(
          pageToFetch < quizRes.data.pagination.historyTotalPages
        );
      }

      loadingBool.onFalse();
    },
    [searchTerm, userId, currentPage]
  );

  const loadMoreHistory = useCallback(async () => {
    if (!hasMoreHistory || loadingMore) return;

    setLoadingMore(true);
    const authObj = await getCookie();

    try {
      const nextPage = currentPage + 1;
      const quizRes = (await getQuizList({
        search: searchTerm,
        date: currentDateToUTC(),
        moderatorId: authObj?.userId ?? userId,
        page: nextPage,
        limit: 12,
      })) as any;

      if (quizRes?.data?.history?.length > 0) {
        setQuizHistoryData((prev) => [...prev, ...quizRes.data.history]);
        setCurrentPage(nextPage);

        if (quizRes?.data?.pagination) {
          setHasMoreHistory(
            nextPage < quizRes.data.pagination.historyTotalPages
          );
        }
      }
    } catch (error) {
      console.error("Error loading more history:", error);
    } finally {
      setLoadingMore(false);
    }
  }, [hasMoreHistory, loadingMore, currentPage, searchTerm, userId]);

  useEffect(() => {
    const handler = debounce(() => {
      // Reset pagination when search term changes
      setCurrentPage(1);
      setHasMoreHistory(true);
      onload(true);
    }, 300);

    handler();

    return () => handler.cancel();
  }, [searchTerm]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMoreHistory && !loadingMore) {
          loadMoreHistory();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    const currentRef = sentinelRef.current;
    if (currentRef && hasMoreHistory) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasMoreHistory, loadingMore, loadMoreHistory, quizHistoryData]);

  const changeVisiblityOfQuiz = async (checked) => {
    const response = await setVisibilityQuiz(checked);
    console.log("response: ", response);
    if (response?.data?.data) {
      setIsQuizVisible(response?.data?.data?.isEnabled);
      toast.success(response.data?.message);
    }
  };
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
                  changeVisiblityOfQuiz(checked);
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
              <div>Is visible quiz?</div>
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
                <>
                  {quizHistoryData.map((data: any, index: number) => (
                    <Fragment key={`${data._id}-${index}`}>
                      <QuizDetailHistoryCard data={data} />
                    </Fragment>
                  ))}

                  {/* Loading more indicator */}
                  {loadingMore && (
                    <div className="col-span-full flex justify-center items-center py-6">
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-gray-600">Loading more...</span>
                      </div>
                    </div>
                  )}

                  {/* Infinite scroll sentinel */}
                  {hasMoreHistory && !loadingMore && (
                    <div
                      ref={sentinelRef}
                      className="col-span-full h-10 flex justify-center items-center"
                    >
                      <div className="text-gray-400 text-sm">Scroll for more</div>
                    </div>
                  )}

                  {!hasMoreHistory && quizHistoryData.length > 0 && (
                    <div className="col-span-full flex justify-center items-center py-6">
                      <span className="text-gray-400">
                        No more history to load
                      </span>
                    </div>
                  )}
                </>
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
