import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quizId = params.id;

    // TODO: Replace this with actual API call to your backend
    // const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/admin/quiz/participant/${quizId}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     // Add authorization headers as needed
    //   },
    // });
    //
    // if (!response.ok) {
    //   throw new Error("Failed to fetch participants");
    // }
    //
    // const data = await response.json();
    // return NextResponse.json(data);

    // Dummy response for now - matches the structure from your API image
    const dummyResponse = {
      message: "Active quiz participants list",
      participants: [
        {
          userId: "6411989",
          username: "MAVANI",
          email: "lalaldha1789@gmail.com",
          pic: "https://parrotpostoss.blob.core.windows.net/images/no_image.svg",
          score: 8,
          usedLives: 0,
          win: "",
          joinedAt: "2025-10-01T11:59:31.704Z",
          lastQuestionId: "",
          lastAnswer: -1,
        },
        {
          userId: "6106384",
          username: "ROMIL",
          email: "romil@example.com",
          pic: "https://parrotpostoss.blob.core.windows.net/images/no_image.svg",
          score: 3,
          usedLives: 0,
          win: "100",
          joinedAt: "2025-10-01T11:59:31.704Z",
          lastQuestionId: "",
          lastAnswer: -1,
        },
      ],
      totalActiveParticipants: 2,
    };

    return NextResponse.json(dummyResponse);
  } catch (error) {
    console.error("Error fetching participants:", error);
    return NextResponse.json(
      { error: "Failed to fetch participants" },
      { status: 500 }
    );
  }
}
