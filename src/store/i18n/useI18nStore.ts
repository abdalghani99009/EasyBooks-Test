import { cultureCode } from "@/common/types/i18n";
import i18n from "@/config/i18n";
import { create } from "zustand";

interface I18nState {
  currentCultureCode: cultureCode;
  dir: "rtl" | "ltr";
}

interface I18nActions {
  setCultureCode: (cultureCode: cultureCode) => void;
  setDir: (dir: "rtl" | "ltr") => void;
}

const useI18nStore = create<I18nState & I18nActions>((set) => ({
  currentCultureCode: i18n.language === "ar" ? cultureCode.Ar : cultureCode.En,
  setCultureCode(cultureCode) {
    set({ currentCultureCode: cultureCode });
  },
  dir: i18n.language === "ar" ? "rtl" : "ltr",
  setDir(dir) {
    set({ dir });
  },
}));

export default useI18nStore;
