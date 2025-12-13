// ----------------------------------------------------------------------

import QuizDetail from "@/components/quiz/detail/detail-quiz";
import { CONFIG } from "@/global-config";

export const metadata = { title: `Quiz Detail| Dashboard - ${CONFIG.appName}` };

export default async function Page({ params }: PageProps) {
  const quizParams = await params;

  const { id } = quizParams;
  return <QuizDetail id={id} />;
}
