import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quizId, participantIds } = body;

    if (!quizId || !participantIds || !Array.isArray(participantIds)) {
      return NextResponse.json(
        { error: "quizId and participantIds array are required" },
        { status: 400 }
      );
    }

    // TODO: Replace this with actual API call to your backend
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/admin/quiz/winner`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization headers as needed
        },
        body: JSON.stringify({
          quizId,
          participantIds,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to set winners");
    }

    const data = await response.json();
    return NextResponse.json(data);

    // Dummy response for now - matches the structure from your API image
    // const dummyResponse = {
    //   message: "Winners updated successfully",
    //   winnersCount: participantIds.length,
    //   winners: participantIds.map((id, index) => ({
    //     userId: id,
    //     username: index === 0 ? "MAVANI" : "ROMIL",
    //     scored: index === 0 ? 3 : 3,
    //     win: "100",
    //   })),
    //   quizId: quizId,
    // };

    // console.log("Setting winners for quiz:", quizId, "Winners:", participantIds);

    // return NextResponse.json(dummyResponse);
  } catch (error) {
    console.error("Error setting winners:", error);
    return NextResponse.json(
      { error: "Failed to set winners" },
      { status: 500 }
    );
  }
}
