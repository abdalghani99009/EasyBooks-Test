import useLogin from "@/modules/Auth/hooks/Login";
import { Button, TextBox, Validator } from "devextreme-react";

export default function LoginForm() {
  const { t } = useLogin();
  return (
    <form className="flex flex-col gap-6 p-12 max-w-lg min-w-lg bg-white rounded-lg justify-center">
      <h1 className="text-3xl font-semibold text-[#212224]">
        {t("login.title")}
      </h1>
      <TextBox
        name="username"
        placeholder={t("login.username")}
        className="w-full"
      >
        <Validator>
          {/* <RequiredRule message={t("validation.required")} /> */}
        </Validator>
      </TextBox>
      <TextBox
        name="password"
        mode="password"
        placeholder={t("login.password")}
        className="w-full"
      >
        <Validator>
          {/* <RequiredRule message={t("validation.required")} /> */}
        </Validator>
      </TextBox>
      <Button
        type="default"
        text={t("login.sign_in")}
        useSubmitBehavior={true}
        width="100%"
        // disabled={isLoading}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      />
    </form>
  );
}
