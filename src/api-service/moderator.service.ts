import { ModeratorFormValues } from "@/utils/schema/moderator.schema";
import { endpoints } from "@/utils/server/axios";
import { apiClient } from "@/utils/server/client-api";

export const getModeratorList = (search: string) => {
  return apiClient(`${endpoints.moderator.next_list}?search=${search}`, {
    method: "GET"
  });
};

export const createNewModerator = (data: ModeratorFormValues) => {
  return apiClient(endpoints.moderator.next_create, {
    method: "POST",
    data,
  });
};
