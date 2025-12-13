// app/actions/set-auth-cookie.ts

"use server";

import { cookies } from "next/headers";
import { STORAGE_KEY } from "src/auth/context/jwt";

export const setAuthCookie = async (authObj: AuthCookie) => {
  const cookieStore = await cookies();
  cookieStore.set(STORAGE_KEY, JSON.stringify(authObj), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return { success: true };
};
