// src/app/api/auth/moderator/login/route.ts

import axios, { endpoints } from "@/utils/server/axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  
  try {
    const response = await axios.post(endpoints.auth.moderator_login, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("Moderator login error:", error);
    
    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    
    return NextResponse.json(
      { message: error.message || "An error occurred during login" },
      { status: error.status ?? 500 }
    );
  }
}
