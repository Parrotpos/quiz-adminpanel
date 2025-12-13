import { endpoints } from "@/utils/server/axios";
import { apiClient } from "@/utils/server/client-api";

export const createNewQuiz = (data: FormData) => {
  return apiClient(endpoints.quiz.next_create, {
    method: "POST",
    data,
  });
};

export const editQuiz = (data: FormData, quizId: string) => {
  return apiClient(endpoints.quiz.next_edit(quizId), {
    method: "POST",
    data,
  });
};

export const getQuizDetail = (id: string) => {
  return apiClient(`${endpoints.quiz.next_detail}/${id}`, {
    method: "GET",
  }) as Promise<IQuizDetailApiRes>;
};

export const getQuizList = (data: QuizListAPiParams) => {
  return apiClient(endpoints.quiz.next_list, {
    method: "POST",
    data,
  });
};

export const unlockRoom = (roomId: string) => {
  return apiClient(`${endpoints.quiz.next_unlockRoom}/${roomId}`, {
    method: "PUT",
  });
};

export const addUrl = (roomId: string, data: any) => {
  return apiClient(`${endpoints.quiz.next_addUrl}/${roomId}`, {
    method: "PUT",
    data,
  });
};

export const addNewQuestionInQuiz = (
  data: Partial<ExtendedQuizFormValues>,
  quizId: string
) => {
  return apiClient(endpoints.quiz.next_que_create(quizId), {
    method: "POST",
    data,
  });
};

export const addAnnouncementForQuiz = (
  data: AddAnnouncementForQuizApiParams
) => {
  return apiClient(endpoints.quiz.next_announcement_create, {
    method: "POST",
    data,
  });
};

export const notifyUser = (data: any) => {
  return apiClient(endpoints.quiz.next_notify_user, {
    method: "POST",
    data,
  });
};

export const getQuizParticipants = (quizId: string) => {
  return apiClient(`${endpoints.quiz.next_participants}/${quizId}`, {
    method: "GET",
  });
};

export const setQuizWinners = (data: {
  quizId: string;
  participantIds: string[];
}) => {
  return apiClient(endpoints.quiz.next_winners, {
    method: "POST",
    data,
  });
};


export const setVisibilityQuiz = (isVisible: boolean) => {
  const data = {
    isEnabled: isVisible
  }
  return apiClient(endpoints.quiz.next_quizVisiblity, {
    method: "POST",
    data,
  });
};

export const getVisibilityQuiz = () => {
  return apiClient(endpoints.quiz.next_get_quizVisiblity, {
    method: "GET"
  });
};
