import { NextRequest } from "next/server";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";
import { endpoints } from "@/utils/server/axios";

export const POST = authorizeAction(async (_req, context) => {
  const { form } = context;

  const result = await apiCall({
    url: endpoints.quiz.quizVisiblity,
    method: "post",
    data: form,
  });

  return Response.json(result, { status: result.statusCode });
});
