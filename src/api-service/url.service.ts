import { endpoints } from "../utils/server/axios";

const UrlParamsReplace = ({ url, params = {} }: TUrlParamsReplaceParams) => {
  if (Object.keys(params).length) {
    Object.keys(params).forEach(
      (key) => (url = url.replace(`:${key}`, params[key]))
    );
  }
  return url;
};

export const LOGIN_URL = () => UrlParamsReplace({ url: endpoints.auth.login });
