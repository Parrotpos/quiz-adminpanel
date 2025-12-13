import { paths } from "@/routes/path";
import path from "path";
import { signOut } from "src/auth/context/jwt";

interface ApiClientConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: Record<string, any>;
  headers?: Record<string, string>;
}

export const apiClient = async (
  endpoint: string,
  { method = "GET", data, headers = {} }: ApiClientConfig = {}
) => {
  const config: RequestInit = {
    method,
    headers: {
      ...headers,
      ...(data && !(data instanceof FormData) && method !== "GET"
        ? { "Content-Type": "application/json" }
        : {}),
    },
  };

  // Attach body if method allows and data exists
  if (data && method !== "GET") {
    config.body = data instanceof FormData ? data : JSON.stringify(data);
  }

  // Add query string for GET requests
  let url = endpoint;
  if (data && method === "GET") {
    const queryString = new URLSearchParams(data).toString();
    url = `${endpoint}?${queryString}`;
  }

  const res = await fetch(url, config);

  const responseData = await res.json();

  if (!url.includes("login") && responseData?.statusCode === 401) {
    window.location.href = window.location.origin + paths.auth.login;
    signOut();
  }

  return responseData;
};
