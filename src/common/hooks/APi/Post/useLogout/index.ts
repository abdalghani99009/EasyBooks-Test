import { useCookies } from "react-cookie";
import { useMutation } from "react-query";

import { logoutRequest } from "./components/LogoutRequest";

export const useLogout = (actionError?: () => void) => {
  const [cookies, _setCookie, removeCookie] = useCookies(["token"], {
    doNotParse: true,
  });

  const mutation = useMutation<void, Error, string>({
    mutationFn: (url) => logoutRequest(url, cookies.token),
    onSuccess: () => {
      removeCookie("token");
      window.location.reload();
    },
    onError: (_error) => {
      actionError && actionError();
    },
  });

  return mutation;
};
