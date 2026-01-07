// ----------------------------------------------------------------------

import EditQuiz from "@/components/quiz/create-quiz/edit-quiz";
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

  return <EditQuiz quizId={quizParams.id} />;
}
