"use client";

import { apiClient } from "@/utils/server/client-api";

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    await apiClient("/api/auth/logout", {
      method: "POST",
    });
    window.location.href = "/login";
  } catch (error) {
    console.error("Error during sign out:", error);
  }
};
