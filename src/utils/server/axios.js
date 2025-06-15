import axios from "axios";

export const ADMIN_BASE_PATH = "/admin";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    const errorData = err?.response?.data || { message: "Server Error" };
    return Promise.reject(errorData);
  }
);

export default axiosInstance;

export const endpoints = {
  auth: {
    next_login: "/api/auth/login",
    login: ADMIN_BASE_PATH + "/login",
  },
  quiz: {
    next_create: "/api/quiz/create",
    create: ADMIN_BASE_PATH + "/quiz/create",
    next_edit: (id) => `/api/quiz/${id}/edit`,
    edit: (id) => ADMIN_BASE_PATH + `/quiz/update/${id}`,
    next_detail: "/api/quiz/detail",
    detail: ADMIN_BASE_PATH + "/quiz/detail",
    next_list: "/api/quiz/list",
    list: ADMIN_BASE_PATH + "/quiz/list-all",
    next_unlockRoom: "/api/quiz/lock-unlock-room",
    unlockRoom: ADMIN_BASE_PATH + "/quiz/lock-room",
    next_addUrl: "/api/quiz/add-url/",
    addUrl: ADMIN_BASE_PATH + "/quiz/videoUrl",

    // Question creation endpoints
    next_que_create: (id) => `/api/quiz/${id}/add-question`,
    que_create: (id) => ADMIN_BASE_PATH + `/quiz/add-question/${id}`,

    // Add Announcement
    next_announcement_create: "/api/quiz/add-announcement",
    announcement_create: ADMIN_BASE_PATH + "/quiz/add-announcement",
    next_notify_user: "/api/quiz/notification",
    notify_user: ADMIN_BASE_PATH + "/quiz/notification",
  },
  moderator: {
    next_create: "/api/moderator/create",
    create: ADMIN_BASE_PATH + "/quiz/create-moderator",
    next_list: "/api/moderator/list",
    list: ADMIN_BASE_PATH + "/quiz/list-moderator",
  },
};
