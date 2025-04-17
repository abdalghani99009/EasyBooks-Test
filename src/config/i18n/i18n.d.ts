import AuthNameSpace from "../../../public/locales/en/auth/translation.json";
import CommonNameSpace from "../../../public/locales/en/common/translation.json";
import StudentNameSpace from "../../../public/locales/en/students/translation.json";

import { ResourceKeys } from "i18next";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      auth: typeof AuthNameSpace;
      common: typeof CommonNameSpace;
      student: typeof StudentNameSpace;
    };
  }
}

export type NameSpaces = keyof ResourceKeys;
