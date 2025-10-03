// @ts-nocheck

import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "../../utils/server/server-util";
import { createAuthenticatedAxios } from "../../utils/server/axiosServer";
import { verifyJwt } from "@/auth/context/jwt/utils";
import { RouteModuleHandleContext } from "next/dist/server/route-modules/route-module";

export const authorizeAction = (handler: HandlerFn) => {
  return async (req: NextRequest, ctx: RouteHandlerContext): Promise<NextResponse> => {
    const paramsFromReq = await ctx.params;

    const authObj = await getCookie();

    if (!authObj) {
      return NextResponse.json(
        { status: false, message: "Unauthorized", statusCode: 401 },
        { status: 401 }
      );
    }

    let decoded = verifyJwt(authObj.token ?? "") as CustomJwtPayload;

    if (decoded?.error) {
      return NextResponse.json(
        { message: decoded?.error || "Invalid or expired token" },
        { status: 401 }
      );
    }

    let form = {};
    const contentType = req.headers.get("Content-Type") || "";

    if (req.method !== "GET") {
      if (contentType.includes("application/json")) {
        form = await req?.json();
      } else if (
        contentType.includes("application/x-www-form-urlencoded") ||
        contentType.includes("multipart/form-data")
      ) {
        const formData = await req.formData();
        form = Object.fromEntries(formData.entries());
      } else if (contentType.includes("text/plain")) {
        const text = await req.text();
        try {
          form = JSON.parse(text);
        } catch {
          form = { text };
        }
      }
    }

    const extendedContext: HandlerContext = {
      ...(paramsFromReq ? paramsFromReq : {}),
      token: decoded?.token ?? "",
      user: decoded,
      form,
    };

    return handler(req, extendedContext);
  };
};

export const apiCall = async ({
  url,
  data = {},
  method = "get",
  headers = {},
}: ApiCallProps): Promise<ApiCallResponse> => {
  const axios = await createAuthenticatedAxios();

  const isGet = method.toLowerCase() === "get";
  const initDataKey = isGet ? "params" : "data";

  const isFormData =
    typeof FormData !== "undefined" && data instanceof FormData;

  // Dynamically build headers
  const mergedHeaders = {
    ...axios.defaults.headers.common,
    Accept: "application/json",
    ...(isFormData ? {} : { "Content-Type": "application/json" }), // skip for FormData
    ...headers, // user overrides last
  };

  const init = {
    url: url,
    method,
    headers: mergedHeaders,
    [initDataKey]: data,
  };

  try {
    const res = await axios.request(init);

    return {
      status: true,
      statusCode: res.status,
      data: res.data,
    };
  } catch (error: any) {
    const message = error?.message || "Server error";
    return {
      status: false,
      statusCode: error?.statusCode || 500,
      message,
      data: error?.data || null,
    };
  }
};
