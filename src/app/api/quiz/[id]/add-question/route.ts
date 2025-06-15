import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const POST = authorizeAction(async (_req, context) => {
  const { form, id } = context;

  const result = await apiCall({
    url: endpoints.quiz.que_create(id),
    method: "post",
    data: form,
  });

  return Response.json(result, { status: result.statusCode });
});
