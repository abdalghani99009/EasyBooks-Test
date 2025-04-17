import { cultureCode } from "@/common/types/i18n";
import { create } from "zustand";

interface I18nState {
  currentCultureCode: cultureCode;
}

interface I18nActions {
  setCultureCode: (cultureCode: cultureCode) => void;
}

const useI18nStore = create<I18nState & I18nActions>((set) => ({
  currentCultureCode: cultureCode.En,
  setCultureCode(cultureCode) {
    set({ currentCultureCode: cultureCode });
  },
}));

export default useI18nStore;
