import { z } from "zod";
import { loginSchema } from "./login.schema";
import { onlyQuestionsSchema, quizSchema } from "./quiz.schema";
import { announcementSchema } from "./schedule.schema";

declare global {
  type LoginFormData = z.infer<typeof loginSchema>;
  type QuizFormValues = z.infer<typeof quizSchema>;
  type QuizScheduleFormValues = z.infer<typeof announcementSchema>;
  type QuestionsOnlyType = z.infer<typeof onlyQuestionsSchema>;
}
