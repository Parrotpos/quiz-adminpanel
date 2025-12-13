"use server";

import { cookies } from "next/headers";
import { STORAGE_KEY } from "../../auth/context/jwt/constant";

export const getCookie = async (): Promise<AuthCookie | null> => {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(STORAGE_KEY);

  if (!authCookie?.value) return null;

  try {
    const authObj: AuthCookie = JSON.parse(authCookie.value);
    return authObj;
  } catch (error) {
    console.error("Failed to parse auth cookie", error);
    return null;
  }
};
