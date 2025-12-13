import jwt from "jsonwebtoken";

declare global {
  interface CustomJwtPayload extends jwt.JwtPayload {
    accessToken?: string;
  }

  type HandlerContext = {
    token: string;
    user: CustomJwtPayload;
    form: Record<string, any>;
    [key: string]: any;
  };

  type HandlerFn = (
    req: NextRequest,
    context: HandlerContext,
    ...args: any[]
  ) => Promise<Response | NextResponse>;

  type RouteHandlerContext = {
    params: Promise<any>;
  };

  type ApiCallProps = {
    url: string;
    data?: Record<string, any>;
    method?: "get" | "post" | "put" | "patch" | "delete";
    headers?: Record<string, string>;
  };

  type ApiCallResponse = {
    status: boolean;
    statusCode: number;
    data?: any;
    message?: string;
  };

  type AuthCookie = {
    token?: string;
    userRole?: string;
    refreshToken?: string;
    userId?: string;
    fullName?: string;
    [key: string]: any;
  };
}
