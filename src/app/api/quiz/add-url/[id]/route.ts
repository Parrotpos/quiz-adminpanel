import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const PUT = authorizeAction(async (req: Request, context) => {
  const { form, id } = context;

  if (!id) {
    return Response.json({ message: "Room ID is required" }, { status: 400 });
  }

  const result = await apiCall({
    url: `${endpoints.quiz.addUrl}/${id}`,
    method: "put",
    data: form,
  });

  return Response.json(result, { status: result.statusCode });
});
