// ----------------------------------------------------------------------

import AddQuizQuestion from "@/components/quiz/create-quiz/add-quiz-question";
import { CONFIG } from "@/global-config";

export const metadata = {
  title: `Edit Quiz | Dashboard - ${CONFIG.appName}`,
};

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const quizParams = await params;

  return <AddQuizQuestion quizId={quizParams.id} />;
}
