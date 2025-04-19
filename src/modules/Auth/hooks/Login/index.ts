import { usePOST } from "@/common/hooks/APi/Post/usePost";
import { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { LoginFormData, LoginSuccessResponse } from "../../types/Login";
import useUserStore from "@/store/User/useUserStore";
import { useCookies } from "react-cookie";
import { AxiosError, AxiosResponse } from "axios";
import notify from "devextreme/ui/notify";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const { t } = useTranslation(["auth", "common"]);
  const {
    submit,
    setFormData,
    mutation: { isPending },
  } = usePOST<LoginFormData>();
  const { setUser } = useUserStore();
  const [_cookies, setCookie] = useCookies(["token"], {
    doNotParse: true,
  });

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    submit<LoginSuccessResponse>({
      url: "User/SignIn",
      mutateOptions: {
        onSuccess: handleLoginSuccess,
        onError: handleLoginError,
      },
    });
  };

  const handleLoginSuccess = (data: AxiosResponse<LoginSuccessResponse>) => {
    const token = data?.data?.token;
    const userName = data?.data?.userName;
    if (token) {
      setCookie("token", token, { path: "/" });
      navigate("/dashboard/students");
      notify(t("login.success"), "success");
    }
    if (userName) {
      setUser(userName);
    }
  };

  const handleLoginError = (error: Error | AxiosError) => {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    console.log(status);
    if (status === 422 || status === 400) {
      notify(axiosError.response?.data, "error");
    }
  };

  return { t, handleSubmit, setFormData, isPending };
}
