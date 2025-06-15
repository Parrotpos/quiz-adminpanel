import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const GET = authorizeAction(async (_req, context) => {
  const { id } = context;

  const result = await apiCall({
    url: `${endpoints.quiz.detail}/${id}`,
    method: "get",
  });

  return Response.json(result, { status: result.statusCode });
});
