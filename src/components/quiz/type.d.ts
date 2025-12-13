interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

interface CommonQuizProps {
  quizId: string;
}
