import { useTranslation } from "react-i18next";

export default function useLogin() {
  const { t } = useTranslation("auth");

  return { t };
}
