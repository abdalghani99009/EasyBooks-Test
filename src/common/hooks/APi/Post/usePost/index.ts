import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import { MutateOptions, useMutation } from "react-query";

import { baseUrl } from "../..";

export type FilesState = Record<string, File>;

export interface SelectedOption {
  value: string | number;
  label: string;
}

export interface ArrayObject {
  id: any;
  value: any;
  deleted?: boolean;
  uploaded?: boolean;
}

interface MutationProps<FormValues> {
  url: string;
  data?: FormValues;
  requestConfig?: AxiosRequestConfig;
}

export interface SubmitProps<FormValues> extends MutationProps<FormValues> {
  mutateOptions?: MutateOptions<
    AxiosResponse<any, any>,
    any,
    MutationProps<FormValues>,
    unknown
  >;
}

export const usePOST = <FormValues extends Record<string, any>>() => {
  const [cookies] = useCookies(["token"], {
    doNotParse: true,
  });

  const mutation = useMutation(
    async ({ url, data, requestConfig }: MutationProps<FormValues>) => {
      const res = await axios.post(`${baseUrl}${url}`, JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
          ...requestConfig?.headers,
        },
        ...requestConfig,
      });

      return res;
    },
  );

  const submit = async ({
    url,
    data,
    requestConfig,
    mutateOptions,
  }: SubmitProps<FormValues>) => {
    return await mutation.mutateAsync(
      { url, data, requestConfig },
      mutateOptions,
    );
  };

  return {
    submit,
    mutation,
  };
};
