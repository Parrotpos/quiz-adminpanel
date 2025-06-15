import axios from "axios";
import { cookies } from "next/headers";
import { STORAGE_KEY } from "src/auth/context/jwt";

export async function createAuthenticatedAxios() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(STORAGE_KEY);

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  });

  if (authCookie) {
    try {
      const authObj = JSON.parse(authCookie.value);

      if (authObj?.token) {
        instance.defaults.headers.common.authorization = authObj.token;
      }
    } catch (err) {
      console.error("Failed to parse auth cookie:", err);
    }
  }

  instance.interceptors.response.use(
    (res) => res,
    (err) => {
      // console.log(err?.response?.data, 'err?.response');
      
      const msgObj =
        typeof err?.response?.data === "string"
          ? { message: err?.response?.data }
          : err?.response?.data;
      let msg = "Server Error";

      if ("message" in msgObj) {
        msg = err?.response?.data?.message;
      } else {
        msg = err?.response?.data?.error;
      }

      const errorData = {
        message: msg,
        statusCode: err?.status || 500,
      };
      return Promise.reject(errorData);
    }
  );

  return instance;
}
