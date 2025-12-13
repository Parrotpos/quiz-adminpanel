import { apiClient } from "@/utils/server/client-api";
import * as HttpService from "./http.service";
import { LOGIN_URL } from "./url.service";
import { endpoints } from "@/utils/server/axios";

export const adminLoginService = (data: IAdminApiParams) => {
  return HttpService.postReq(LOGIN_URL(), data);
};

export const adminNextLoginService = (data: IAdminApiParams) => {
  return apiClient(endpoints.auth.next_login, {
    method: "POST",
    data,
  });
};

export const moderatorNextLoginService = (data: IAdminApiParams) => {
  return apiClient(endpoints.auth.next_moderator_login, {
    method: "POST",
    data,
  });
};
