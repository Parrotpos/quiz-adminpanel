export const runtime = "nodejs";

import { endpoints } from "@/utils/server/axios";
import { apiCall, authorizeAction } from "src/lib/middleware/authorizeAction";

export const GET = authorizeAction(async (_req, context) => {
  const { id } = context;

  // For testing purposes - return dummy data
  // const dummyData = {
  //   message: "Active quiz participants list",
  //   participants: [
  //     {
  //       userId: "7198339",
  //       username: "ROMIL",
  //       email: "romilsaptestl239@gmail.com",
  //       phone: "", // No phone for this user as per API response
  //       pic: "https://parrotpostoss.blob.core.windows.net/images/tdmginez1baafc1.png",
  //       scored: 0,
  //       usedLives: 0,
  //       win: "",
  //       joinedAt: "2025-10-06T11:04:07.798Z",
  //       lastQuestionId: "",
  //       lastAnswer: -1,
  //       lastTransactionTotal: 30,
  //       lastPaymentCount: 3,
  //       lastReferralCount: 0,
  //     },
  //     {
  //       userId: "4797798",
  //       username: "ROMIL",
  //       email: "testingromil123@gmail.com",
  //       phone: "8123476986",
  //       pic: "https://parrotpostoss.blob.core.windows.net/images/gaoffgsipfousa.png",
  //       scored: 0,
  //       usedLives: 0,
  //       win: "",
  //       joinedAt: "2025-10-06T11:04:14.942Z",
  //       lastQuestionId: "",
  //       lastAnswer: -1,
  //       lastTransactionTotal: 20,
  //       lastPaymentCount: 3,
  //       lastReferralCount: 0,
  //     },
  //   ],
  // };

  // return Response.json({ data: dummyData, statusCode: 200 }, { status: 200 });

  // TODO: When you want to use real API, uncomment this:
  const result = await apiCall({
    url: `${endpoints.quiz.participants}/${id}`,
    method: "get",
  });
  return Response.json(result, { status: result.statusCode });
});
