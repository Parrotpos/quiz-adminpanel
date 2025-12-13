// ----------------------------------------------------------------------

import ViewQuiz from "@/components/quiz/view/view-quiz";
import { CONFIG } from "@/global-config";

export const metadata = { title: `Quiz Detail| Dashboard - ${CONFIG.appName}` };

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  return <ViewQuiz id={id} />;
}
