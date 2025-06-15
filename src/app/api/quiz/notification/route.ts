// src/app/api/moderator/create/route.ts

import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const POST = authorizeAction(async (_req: any, context) => {
  const { form } = context;

  const result = await apiCall({
    url: endpoints.quiz.notify_user,
    method: "post",
    data: form,
  });

  return Response.json(result, { status: result.statusCode });
});
