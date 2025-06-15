import { z } from "zod";

export const questionSchema = z.object({
  id: z.string().optional(),
  question: z.string().min(1, "Question is required"),
  options: z
    .array(z.string().min(1, "Option is required"))
    .min(2, "At least 2 options are required"),
  correctAnswer: z.number().min(0, "Correct answer is required"),
  isHidden: z.boolean().default(false),
  isHide: z.boolean().default(false).optional(),
});

export const onlyQuestionsSchema = z.object({
  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
});

export const quizSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"),
  // image: z.string().min(1, "Image is required"),
  image: z
    .union([z.instanceof(File), z.string()])
    .nullable()
    .refine(
      (value) => {
        if (!value) return true; // Allow null or undefined
        if (typeof value === "string") return value.trim().length > 0; // Validate non-empty string
        return value.size > 0 && value.type.startsWith("image/"); // Validate File type
      },
      {
        message: "Must be a valid image file or a non-empty string",
      }
    ),
  time: z.string().min(1, "Time is required"),
  joinType: z.enum(["unlimited", "restricted"], {
    errorMap: () => ({ message: "Join type is required" }),
  }),
  maxUsers: z.coerce.number().default(0),
  quizPrice: z.coerce.string().min(0, "Please enter valid quiz price"),
  questionCountdown: z.coerce
    .number()
    .min(1, "Countdown must be at least 1 second"),
  description: z.string().min(1, "Description is required"),
  moderator: z
    .string({
      required_error: "Moderator is required", // handles undefined/missing case
      invalid_type_error: "Moderator must be a string",
    })
    .min(1, { message: "Moderator is required" }), // handles empty string

  questions: z
    .array(questionSchema)
    .min(1, "At least one question is required"),
  questionTypes: z.string().optional(),
});
