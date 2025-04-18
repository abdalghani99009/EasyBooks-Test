import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  isAxiosError,
} from "axios";
import { useCookies } from "react-cookie";

import { baseUrl } from "../..";
import { MutateOptions, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import notify from "devextreme/ui/notify";
import { useTranslation } from "react-i18next";

interface MutationProps<FormDataType> {
  url: string;
  data?: FormDataType;
  requestConfig?: AxiosRequestConfig;
}

export interface SubmitProps<
  FormDataType,
  SuccessResponseType = any,
  ErrorResponseType = any,
> extends MutationProps<FormDataType> {
  mutateOptions?: MutateOptions<
    AxiosResponse<SuccessResponseType>,
    AxiosError<ErrorResponseType> | Error,
    MutationProps<FormDataType>,
    unknown
  >;
}

export const usePOST = <FormDataType extends Record<string, any>>(
  initialData?: FormDataType
) => {
  const [formData, setFormData] = useState<FormDataType | undefined>(
    initialData
  );
  const [cookies] = useCookies(["token"], {
    doNotParse: true,
  });
  const { t } = useTranslation("common");

  const mutation = useMutation({
    mutationFn: async ({
      url,
      data,
      requestConfig,
    }: MutationProps<FormDataType>) => {
      const res = await axios.post(`${baseUrl}${url}`, JSON.stringify(data), {
        headers: {
          Authorization: `Bearer ${cookies.token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          ...requestConfig?.headers,
        },
        ...requestConfig,
      });

      return res;
    },
  });

  const submit = async <SuccessResponseType = any, ErrorResponseType = any>({
    url,
    data,
    requestConfig,
    mutateOptions,
  }: SubmitProps<FormDataType, SuccessResponseType, ErrorResponseType>) => {
    return await mutation.mutateAsync(
      { url, data: data || formData, requestConfig },
      {
        onError(error, variables, context) {
          if (!isAxiosError(error)) {
            notify(t("errors.unknown"));
            return;
          }
          mutateOptions?.onError &&
            mutateOptions?.onError(error, variables, context);
        },
        ...mutateOptions,
      }
    );
  };

  return {
    submit,
    mutation,
    formData,
    setFormData,
  };
};
