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
    
    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: any) {
    console.error("Login API error:", error);
    
    // Handle timeout errors
    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      return NextResponse.json(
        { message: "Backend server is not responding. Please try again later.", status: false },
        { status: 504 }
      );
    }
    
    // Handle network/connection errors
    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      return NextResponse.json(
        { message: "Unable to connect to the server. Please try again later.", status: false },
        { status: 503 }
      );
    }
    
    // If error response exists, return its status and data
    if (error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    
    // Fallback for unknown errors
    return NextResponse.json(
      { message: error.message || "An error occurred during login", status: false },
      { status: 500 }
    );
  }
}
