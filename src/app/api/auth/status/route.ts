import { STORAGE_KEY, verifyJwt } from "@/auth/context/jwt";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(STORAGE_KEY);

  if (!authCookie) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    const authObj = JSON.parse(authCookie.value);

    let decoded = verifyJwt(authObj.token ?? "") as CustomJwtPayload;

    if (decoded.error) {
      return NextResponse.json(
        {
          isAuthenticated: false,
          message: decoded.error || "Invalid or expired token",
        },
        { status: 401 }
      );
    }

    return NextResponse.json({ isAuthenticated: true, user: authObj });
  } catch (error) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
