import { cultureCode } from "@/common/types/i18n";
import i18n from "@/config/i18n";
import useI18nStore from "@/store/i18n/useI18nStore";
import { useEffect } from "react";

export default function useLanguage() {
  const { currentCultureCode, setCultureCode, setDir, dir } = useI18nStore();

  useEffect(() => {
    i18n.changeLanguage(currentCultureCode === cultureCode.En ? "en" : "ar");
    setDir(currentCultureCode === cultureCode.En ? "ltr" : "rtl");
  }, [currentCultureCode, i18n, setDir]);

  return { setCultureCode, setDir, dir, currentCultureCode };
}
