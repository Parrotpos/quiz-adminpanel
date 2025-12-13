// ----------------------------------------------------------------------

import CreateQuiz from "@/components/quiz/create-quiz/create-quiz";
import { CONFIG } from "@/global-config";

export const metadata = { title: `Create Quiz | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return <CreateQuiz />;
}
