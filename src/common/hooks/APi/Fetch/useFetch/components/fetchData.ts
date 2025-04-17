import axios, { AxiosRequestConfig } from "axios";

import { baseUrl } from "../../..";

export const fetchData = async <T>({
  url,
  requestConfig,
  token,
}: {
  url: string;
  token?: string | null;
  requestConfig?: AxiosRequestConfig;
}) => {
  const response = await axios.get<T>(`${baseUrl}${url}`, {
    headers: {
      Authorization: `Bearer ${token || ""}`,
      Accept: "application/json",
      ...requestConfig?.headers,
    },
    ...requestConfig,
  });

  return response.data;
};
