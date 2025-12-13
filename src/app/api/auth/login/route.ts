// src/app/api/auth/login/route.ts

import axios, { endpoints } from "@/utils/server/axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const response = await axios.post(endpoints.auth.login, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("response: ", response);
    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: any) {
    // If error response exists, return its status and data
    console.log("error.response: ", error);
    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    // Fallback for unknown errors
    return NextResponse.json(
      { message: error.message || "An error occurred" },
      { status: error.status ?? 500 }
    );
  }
}
