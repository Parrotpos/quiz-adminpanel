"use client";

import { getQuizDetail, notifyUser } from "@/api-service/quiz.service";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import UrlModal from "../url-modal";
import { paths } from "@/routes/path";
import { useRouter } from "next/navigation";
import GradientButton from "@/components/molecules/gradient-button/gradient-button";
import { useBoolean } from "@/hooks/useBoolean";
import QuizSkeleton from "@/components/shared/skeleton/quiz-skeleton";
import Link from "next/link";
import Typography from "@/components/ui/typegraphy";
import TextHeader1 from "@/components/TextHeader1";
import { toast } from "sonner";

export default function ViewQuiz({ id }: { id: string }) {
  const participants = [
    { id: 1, name: "User 1", avatar: "/images/user.jpg" },
    { id: 2, name: "User 2", avatar: "/images/user.jpg" },
    { id: 3, name: "User 3", avatar: "/images/user.jpg" },
    { id: 4, name: "User 4", avatar: "/images/user.jpg" },
    { id: 5, name: "User 5", avatar: "/images/user.jpg" },
  ];
  const router = useRouter();
  const [quizData, setQuizData] = useState<any>({});
  const [urlModalOpen, setUrlModalOpen] = useState(false);

  const loadingBool = useBoolean();

  useEffect(() => {
    onload();
  }, [id]);

  const onload = async () => {
    loadingBool.onTrue();
    const quizRes = (await getQuizDetail(id)) as any;
    setQuizData(quizRes.data.data);
    loadingBool.onFalse();
  };

  const onNotify = async () => {
    const notifyRes = (await notifyUser({
      quizId: id,
    })) as IDefaultResponse;
    if (!notifyRes.status) {
      toast.error(notifyRes?.message ?? "Something went wrong!");
    } else {
      toast.success(
        notifyRes?.message ?? "User notification send successfully!"
      );
    }
  };

  return loadingBool.bool ? (
    <QuizSkeleton />
  ) : (
    <div className="min-h-full bg-gray-50">
      <div className="flex flex-col  px-2 pt-2 pb-3 md:flex-row justify-between items-start md:items-center gap-2 md:gap-0">
        <Typography size="lg" className="text-start font-bold">
          Quiz Details
        </Typography>
        <div className="text-[13px] flex justify-around items-start sm:items-center gap-2 flex-col sm:flex-row">
          <span className="font-bold">View Quiz /</span> Quiz Management
        </div>
      </div>
      <div className="mx-auto p-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quiz Overview Card */}
          <Card className="bg-white shadow-sm">
            <TextHeader1 title="Quiz Overview" />
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <CardItem title="Quiz Title" description={quizData?.title} />
                <CardItem
                  title="Description"
                  description={quizData?.description}
                />
                <CardItem title="Status" description={quizData?.status} />
                <CardItem
                  title="Scheduled Date"
                  description={quizData?.scheduledDate}
                />
                <CardItem title="Time" description={quizData?.time} />
                <CardItem
                  title="Total Questions"
                  description={quizData?.totalQuestions}
                />
              </div>
            </CardContent>
          </Card>

          {/* Other Details Card */}
          <Card className="bg-white shadow-sm">
            <TextHeader1 title="Other Details" />
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <CardItem
                  title="Prize Pool"
                  description={quizData?.quizPrice}
                />
                <CardItem
                  title="Que Countdown"
                  description={quizData?.questionCountdown}
                />
                <CardItem
                  title="Question Types"
                  description={quizData?.questionType}
                />
                <CardItem
                  title="Notified Players"
                  description={quizData?.notifiedPlayersCount}
                />
                <div className="flex items-start">
                  <span className="w-[150px] text-sm font-semibold text-[#686868]">
                    Participants:
                  </span>
                  <div className="flex items-end gap-2">
                    <div className="flex -space-x-2">
                      {participants.map((participant) => (
                        <Avatar
                          key={participant.id}
                          className="w-8 h-8 border-2 border-white"
                        >
                          <AvatarImage
                            src={participant.avatar || "/placeholder.svg"}
                            alt={participant.name}
                          />
                          <AvatarFallback className="text-xs">
                            {participant.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 px-3 border border-black rounded-lg"
                    >
                      View All Participants
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <UrlModal open={urlModalOpen} onOpenChange={setUrlModalOpen} id={id} />

        {/* Start Quiz Button */}
        <div className="mt-6">
          <GradientButton
            type="button"
            className="text-white px-6 py-2"
            onClick={() => {
              if (quizData.videoUrl) {
                router.push(`${paths.quiz_management.detail}/${id}`);
              } else {
              }
              setUrlModalOpen(true);
            }}
          >
            Start Quiz Now
          </GradientButton>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              onNotify();
            }}
            className="font-bold px-8 py-5 text-[#0E76BC] border-2 border-[#0E76BC] hover:text-[#0E76BC] ml-2"
          >
            Notify to users
          </Button>
        </div>
      </div>
    </div>
  );
}

const CardItem = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-center">
      <span className="w-[150px] text-sm font-semibold text-[#686868]">
        {title}:
      </span>
      <span className="text-sm text-gray-900">{description}</span>
    </div>
  );
};
