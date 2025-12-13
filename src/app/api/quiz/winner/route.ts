export const config = {
  runtime: "nodejs",
};

import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const POST = authorizeAction(async (_req, context) => {
  const { form } = context;
  const { quizId, participantIds } = form;

  if (!quizId || !participantIds || !Array.isArray(participantIds)) {
    return Response.json(
      {
        status: false,
        message: "quizId and participantIds array are required",
        statusCode: 400,
      },
      { status: 400 }
    );
  }

  const result = await apiCall({
    url: endpoints.quiz.winners,
    method: "put",
    data: {
      quizId,
      participantIds,
    },
  });

  console.log("result: p02", result);
  return Response.json(result, { status: result.statusCode });
});
