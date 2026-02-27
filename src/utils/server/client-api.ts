import { paths } from "@/routes/path";
import { signOut } from "src/auth/context/jwt";
 
const FETCH_TIMEOUT_MS = 30000; // 30 seconds - prevents indefinite loading on 504/timeouts
 
interface ApiClientConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: Record<string, any>;
  headers?: Record<string, string>;
}
 
export const apiClient = async (
  endpoint: string,
  { method = "GET", data, headers = {} }: ApiClientConfig = {}
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
 
  const config: RequestInit = {
    method,
    signal: controller.signal,
    credentials: "include", // Send cookies (e.g. auth) with same-origin and API requests
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
 
  let res: Response;
  try {
    res = await fetch(url, config);
  } catch (fetchError) {
    clearTimeout(timeoutId);
    if (fetchError instanceof Error && fetchError.name === "AbortError") {
      return {
        message: "Request timed out. Please try again.",
        status: 0,
        statusCode: 504,
      };
    }
    throw fetchError;
  }
  clearTimeout(timeoutId);
 
  // Safely parse response - server may return HTML (504, 502, etc.) instead of JSON
  let responseData: Record<string, unknown>;
  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
 
  if (isJson) {
    try {
      responseData = await res.json();
    } catch {
      responseData = {
        message: "Invalid response from server",
        statusCode: res.status,
      };
    }
  } else {
    // HTML error page (504 Gateway Timeout, 502 Bad Gateway, etc.)
    const statusMessages: Record<number, string> = {
      502: "Backend server is temporarily unavailable. Please try again.",
      503: "Service temporarily unavailable. Please try again.",
      504: "Request timed out. The server may be slow or overloaded. Please try again.",
    };
    const message = statusMessages[res.status] || `Server error (${res.status}). Please try again.`;
    responseData = {
      message,
      status: 0, // Falsy so login form shows error instead of redirecting
      statusCode: res.status,
    };
  }
 
  // Redirect to login on 401, but not for auth/status (used to check session) or login endpoint
  const isAuthStatusOrLogin =
    url.includes("/api/auth/status") || url.includes("login");
  if (
    !isAuthStatusOrLogin &&
    (res.status === 401 || responseData?.statusCode === 401)
  ) {
    window.location.href = window.location.origin + paths.auth.login;
    signOut();
  }
 
  return responseData;
};
 