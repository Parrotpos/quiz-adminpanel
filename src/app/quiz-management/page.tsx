// ----------------------------------------------------------------------

import QuizComponent from "@/components/quiz/quiz-component";
import { CONFIG } from "@/global-config";

export const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <QuizComponent />;
}
