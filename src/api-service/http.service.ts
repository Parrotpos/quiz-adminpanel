import axios from "@/utils/server/axios";

export const getReq = async <T = any>(
  url: string
): Promise<{ status: boolean; data?: T; message?: string }> => {
  try {
    const response = await axios.get<T>(url);
    return { status: true, data: response.data };
  } catch (ex: any) {
    return { status: false, message: ex.message };
  }
};

export const postReq = async <T = any, P = any>(
  url: string,
  payload: P
): Promise<{ status: boolean; data?: T; message?: string }> => {
  try {
    const response = await axios.post<T>(url, payload);
    return { status: true, data: response.data };
  } catch (ex: any) {
    return { status: false, message: ex.message };
  }
};
