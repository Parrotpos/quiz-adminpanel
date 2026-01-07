import ScheduleQuiz from "@/components/quiz/schedule-quiz/schedule-quiz";
import { CONFIG } from "@/global-config";

export const metadata = {
  title: `Quiz Schedule | Dashboard - ${CONFIG.appName}`,
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const quizParams = await params;

  return <ScheduleQuiz quizId={quizParams?.id} />;
}
