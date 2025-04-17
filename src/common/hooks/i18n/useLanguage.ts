import { cultureCode } from "@/common/types/i18n";
import i18n from "@/config/i18n";
import useI18nStore from "@/store/i18n";

export default function useLanguage() {
  const { currentCultureCode, setCultureCode } = useI18nStore();

  const toggleLanguage = () => {
    setCultureCode(
      currentCultureCode === cultureCode.En ? cultureCode.Ar : cultureCode.En
    );
    i18n.changeLanguage(currentCultureCode === cultureCode.En ? "ar" : "en");
  };

  return { toggleLanguage, cultureCode, setCultureCode };
}
