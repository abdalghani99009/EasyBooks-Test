import axios, { AxiosResponse } from "axios";
import { useCookies } from "react-cookie";
import { MutateOptions, useMutation } from "react-query";

import { baseUrl } from "../..";

interface MutationProps {
  url: string;
}

interface SubmitProps extends MutationProps {
  mutateOptions?: MutateOptions<
    AxiosResponse<any, any>,
    any,
    MutationProps,
    unknown
  >;
}

export const useDelete = (
  actionSuccess: () => void,
  actionError: () => void,
) => {
  const [cookies, _setCookie, _removeCookie] = useCookies(["token"], {
    doNotParse: true,
  });
  const mutation = useMutation(
    ({ url }: MutationProps) =>
      axios
        .delete(baseUrl + url, {
          headers: {
            Authorization: "Bearer " + cookies.token,
            Accept: "application/json",
          },
        })
        .then((res) => res.data),
    {
      onSuccess: (_data) => {
        actionSuccess();
      },
      onError: (_error) => {
        actionError();
      },
    },
  );

  const deleteItem = async ({ url, mutateOptions }: SubmitProps) => {
    await mutation.mutateAsync({ url }, mutateOptions);
  };

  return { deleteItem, mutation };
};
