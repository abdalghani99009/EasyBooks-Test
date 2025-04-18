import { useTranslation } from "react-i18next";
import useLanguage from "./useLanguage";
import { cultureCode } from "@/common/types/i18n";
import { DataSource } from "devextreme/common/data";
import { LanguageItem } from "@/common/types/i18n/langauge-select";

export default function useLanguageSelect() {
  const { t } = useTranslation("common");
  const { setCultureCode } = useLanguage();
  const languages: LanguageItem[] = [
    { text: t("language.english"), id: cultureCode.En },
    { text: t("language.arabic"), id: cultureCode.Ar },
  ];

  const dataSource = new DataSource({
    store: {
      data: languages,
      type: "array",
      key: "id",
    },
  });

  return { dataSource, setCultureCode, t };
}
