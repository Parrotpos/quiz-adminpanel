import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { STORAGE_KEY } from "src/auth/context/jwt";

export async function POST() {
  const cookieStore = await cookies();

  // Remove the authentication cookie
  cookieStore.set(STORAGE_KEY, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0, // Immediately expires the cookie
  });

  return NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });
}
