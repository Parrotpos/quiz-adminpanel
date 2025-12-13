import jwt from "jsonwebtoken";

import { STORAGE_KEY } from "./constant";

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET;

export const getSession = () => {
  let auth = sessionStorage.getItem(STORAGE_KEY);
  return auth ? JSON.parse(auth) : null;
};

export const verifyJwt = (
  token: string
): { error?: string } | jwt.JwtPayload | null => {
  try {
    if (!JWT_SECRET) return null;

    const decoded = jwt.verify(token, JWT_SECRET);

    return typeof decoded === "string"
      ? { error: "Invalid token format" }
      : decoded as CustomJwtPayload;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return { error: "Token Expired" };
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return { error: "Invalid Token" };
    }

    return { error: (error as Error).message || "UnknownError" };
  }
};
