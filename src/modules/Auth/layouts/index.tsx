import AuthImage from "@/common/assets/images/login/image.svg";
import AuthBackground from "@/common/assets/images/login/background.svg";
import { Outlet } from "react-router-dom";
import LanguageSelect from "@/common/components/Translation/LanguageSelect";

export default function AuthLayout() {
  return (
    <div className="flex w-full h-screen">
      <div className="relative lg:p-16 flex justify-center items-center">
        <img src={AuthImage} />
        <div className={`absolute top-4 left-4`}>
          <LanguageSelect />
        </div>
      </div>
      <div className={`relative h-full w-full flex-grow`}>
        <img
          src={AuthBackground}
          className="absolute top-0 left-0 object-cover w-full h-full z-0"
        />
        <div className="relative z-10 flex justify-center items-center h-full w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
