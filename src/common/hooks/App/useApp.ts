import { cultureCode } from "@/common/types/i18n";
import useUserStore from "@/store/User/useUserStore";
import useI18nStore from "@/store/i18n/useI18nStore";
import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function useApp() {
  const { dir, setCultureCode } = useI18nStore();
  const { setIsAuthenticated } = useUserStore();
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;
  const navigate = useNavigate();
  useEffect(() => {
    const language = localStorage.getItem("i18nextLng");
    setCultureCode(language === "ar" ? cultureCode.Ar : cultureCode.En);
    if (!token) {
      navigate("/auth/login");
    } else {
      setIsAuthenticated(true);
      navigate("/dashboard/students");
    }
  }, []);
  return { dir };
}
