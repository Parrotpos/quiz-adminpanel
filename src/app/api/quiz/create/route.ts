export const config = {
  runtime: "nodejs",
};

import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const POST = authorizeAction(async (_req, context) => {
  const { form } = context;

  const formData = new FormData();

  Object.entries(form).forEach(([key, value]) => {
    if (key === "questions" && Array.isArray(value)) {
      value.forEach((questionObj, index) => {
        formData.append(`questions[${index}].question`, questionObj.question);
        questionObj.options.forEach((opt: any, optIndex: number) => {
          formData.append(`questions[${index}].options[${optIndex}]`, opt);
        });
        formData.append(
          `questions[${index}].correctAnswer`,
          String(questionObj.correctAnswer)
        );
        formData.append(
          `questions[${index}].isHidden`,
          String(questionObj.isHidden)
        );
      });
    }  if (
      value &&
      typeof value === "object" &&
      typeof (value as any).arrayBuffer === "function"
    ) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((val, i) => formData.append(`${key}[${i}]`, String(val)));
    } else if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });

  const result = await apiCall({
    url: endpoints.quiz.create,
    method: "post",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log("result: test log",result)
  return Response.json(result, { status: result.statusCode });
});
