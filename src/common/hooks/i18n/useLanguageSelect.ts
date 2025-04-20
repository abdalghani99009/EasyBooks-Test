import { useTranslation } from "react-i18next";
import useLanguage from "./useLanguage";
import { cultureCode } from "@/common/types/i18n";
import { DataSource } from "devextreme/common/data";
import { LanguageItem } from "@/common/types/i18n/langauge-select";
import { useMemo } from "react";

export default function useLanguageSelect() {
  const { t } = useTranslation("common");
  const { setCultureCode, currentCultureCode } = useLanguage();
  const languages: LanguageItem[] = useMemo(
    () => [
      { text: t("language.english"), id: cultureCode.En },
      { text: t("language.arabic"), id: cultureCode.Ar },
    ],
    [t]
  );

  const dataSource = useMemo(
    () =>
      new DataSource({
        store: {
          data: languages,
          type: "array",
          key: "id",
        },
      }),
    [languages]
  );

  return { dataSource, setCultureCode, t, currentCultureCode };
}
