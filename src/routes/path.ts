export const paths = {
  // AUTH
  auth: {
    login: "/login",
  },
  quiz_management: {
    root: "/quiz-management",
    create: "/quiz-management/create",
    edit: (id: string) => `/quiz-management/${id}/edit`,
    schedule: (id: string) => `/quiz-management/${id}/schedule`,
    view: "/quiz-management/view",
    detail: "/quiz-management/detail",
    add_question: (id: string) => `/quiz-management/${id}/add-question`,
  },
};
