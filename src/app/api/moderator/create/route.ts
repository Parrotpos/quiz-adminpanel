// src/app/api/moderator/create/route.ts

import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const POST = authorizeAction(async (_req, context) => {
  const { form } = context;

  const result = await apiCall({
    url: endpoints.moderator.create,
    method: "post",
    data: form,
  });

  return Response.json(result, { status: result.statusCode });
});
