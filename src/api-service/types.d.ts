type TUrlParamsReplaceParams = {
  url: string;
  params?: Record<string, any>;
};

interface ObjType {
  [key: string]:
    | string
    | number
    | boolean
    | Array<ObjType | string | number | boolean>
    | ObjType;
}

interface IDefaultResponse {
  status: boolean;
  message: string;
  data?: ObjType | Array<any>;
  error?: any;
  statusCode?: number;
}
interface IApiCallResponse extends IDefaultResponse {
  unauthorize?: boolean;
  error?: ObjType;
}

interface IAdminApiParams {
  email: string;
  password: string;
}

type ExtendedQuizFormValues = Partial<QuizFormValues> & {
  scheduledDate?: string;
  isHide?: boolean;
};

interface IQuizDetailApiRes extends Omit<IDefaultResponse, "data"> {
  data: { data: ExtendedQuizFormValues };
}

interface AddAnnouncementForQuizApiParams {
  quizId: string;
  announcement: QuizScheduleFormValues["announcements"];
}

interface QuizListAPiParams {
  search?: string;
  date?: string;
  page?: number;
  limit?: number;
  moderatorId?: string;
}
