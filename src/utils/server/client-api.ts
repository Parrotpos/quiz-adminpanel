import { paths } from "@/routes/path";
import { signOut } from "src/auth/context/jwt";

interface ApiClientConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: Record<string, any>;
  headers?: Record<string, string>;
  timeout?: number;
}

const DEFAULT_TIMEOUT = 30000; // 30 seconds

export const apiClient = async (
  endpoint: string,
  { method = "GET", data, headers = {}, timeout = DEFAULT_TIMEOUT }: ApiClientConfig = {}
) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const config: RequestInit = {
    method,
    credentials: "include",
    headers: {
      ...headers,
      ...(data && !(data instanceof FormData) && method !== "GET"
        ? { "Content-Type": "application/json" }
        : {}),
    },
    signal: controller.signal,
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

  try {
    const res = await fetch(url, config);
    clearTimeout(timeoutId);

    // Handle gateway errors (502, 503, 504) - these often return HTML instead of JSON
    if (res.status >= 502 && res.status <= 504) {
      return {
        status: false,
        message: "Server is temporarily unavailable. Please try again in a few moments.",
        statusCode: res.status,
      };
    }

    // Try to parse as JSON, handle HTML error pages gracefully
    const contentType = res.headers.get("content-type");
    let responseData;
    
    if (contentType?.includes("application/json")) {
      responseData = await res.json();
    } else {
      const text = await res.text();
      if (text.startsWith("<")) {
        return {
          status: false,
          message: "Server returned an error. Please try again later.",
          statusCode: res.status || 500,
        };
      }
      try {
        responseData = JSON.parse(text);
      } catch {
        return {
          status: false,
          message: "Invalid server response. Please try again.",
          statusCode: res.status || 500,
        };
      }
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
  } catch (error: any) {
    clearTimeout(timeoutId);
    
    if (error.name === "AbortError") {
      return {
        status: false,
        message: "Request timed out. Please check your network connection and try again.",
        statusCode: 408,
      };
    }
    
    return {
      status: false,
      message: error.message || "Network error occurred. Please try again.",
      statusCode: 500,
    };
  }
};
