import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";

i18n
  .use(LanguageDetector)
  .use(Backend)
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(
          `../../../public/locales/${language}/${namespace}/translation.json`
        )
    )
  )
  .init({
    fallbackLng: import.meta.env.VITE_LANGUAGE || "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    supportedLngs: ["en", "ar"],
    ns: ["auth", "common", "site-routes", "category", "product", "errors"],
    defaultNS: "common",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}/translation.json",
    },
    detection: {
      order: ["localStorage"],
      caches: ["localStorage"],
    },
  });

export default i18n;
