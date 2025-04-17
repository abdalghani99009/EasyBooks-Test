import { AxiosRequestConfig } from "axios";
import { AxiosError } from "axios";
import { QueryOptions, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { fetchData } from "./components/fetchData";

export interface UseFetchProps<T> {
  url: string;
  key: string[];
  params?: string | string[][] | Record<string, string> | URLSearchParams;
  queryOptions?: QueryOptions<T, AxiosError>;
  requestConfig?: AxiosRequestConfig;
}

export default function useFetch<T>({
  url,
  key,
  params,
  queryOptions,
  requestConfig,
}: UseFetchProps<T>) {
  const [urlToSend, setUrlToSend] = useState(url);
  const [cookies] = useCookies(["token"], {
    doNotParse: true,
  });

  useEffect(() => {
    if (params) {
      setUrlToSend(url + "?" + new URLSearchParams(params));
    }
  }, [params]);

  const query = useQuery<T, AxiosError>({
    queryKey: key,
    queryFn: () =>
      fetchData({ url: urlToSend, token: cookies.token, requestConfig }),
    ...queryOptions,
  });

  return query;
}
