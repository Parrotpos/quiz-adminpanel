import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const PUT = authorizeAction(async (req: Request, context) => {
  const { form } = context;
  console.log('form: ', form);

  // Validate required fields
  if (!form.app_id || !form.channel_name || !form.app_certificate) {
    return Response.json(
      { 
        message: "app_id, channel_name, and app_certificate are required" 
      }, 
      { status: 400 }
    );
  }

  const result = await apiCall({
    url: endpoints.quiz.addUrl,
    method: "post",
    data: {
      app_id: form.app_id,
      channel_name: form.channel_name,
      app_certificate: form.app_certificate,
      quiz_id: form.quiz_id,
    },
  });

  return Response.json(result, { status: result.statusCode });
});
