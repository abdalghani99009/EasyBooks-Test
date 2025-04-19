import AuthImage from "@/common/assets/images/login/image.svg";
import AuthBackground from "@/common/assets/images/login/background.svg";
import { Outlet } from "react-router-dom";
import LanguageSelect from "@/common/components/Translation/LanguageSelect";
import useI18nStore from "@/store/i18n/useI18nStore";
import { cultureCode } from "@/common/types/i18n";

export default function AuthLayout() {
  const { currentCultureCode } = useI18nStore();
  return (
    <div className="flex w-full h-screen">
      <div className="relative max-lg:hidden p-16 flex justify-center items-center">
        <img src={AuthImage} />
        <div
          className={`absolute top-4 ${currentCultureCode === cultureCode.En ? "left-4" : "right-4"} `}
        >
          <LanguageSelect />
        </div>
      </div>
      <div className={`relative h-full w-full flex-grow`}>
        <img
          src={AuthBackground}
          className="absolute top-0 left-0 object-cover w-full h-full z-0"
        />
        <div className="relative max-sm:p-4 z-10 flex justify-center items-center h-full w-full">
          <Outlet />
        </div>
      </div>
      <div
        className={`absolute z-20 lg:hidden top-4 ${currentCultureCode === cultureCode.En ? "left-4" : "right-4"}`}
      >
        <LanguageSelect />
      </div>
    </div>
  );
}
