// src/app/api/auth/login/route.ts

import axios, { endpoints } from "@/utils/server/axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const response = await axios.post(endpoints.auth.login, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return NextResponse.json(response.data, {
    status: response.status,
  });
}
