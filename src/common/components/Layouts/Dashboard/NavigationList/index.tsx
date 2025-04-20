import List from "devextreme-react/list";
import { useTranslation } from "react-i18next";
import "./index.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useCallback, useMemo, useState } from "react";
import { ItemClickEvent } from "devextreme/ui/list";
import Button from "devextreme-react/cjs/button";
import LogoutPopup from "@/common/components/Popups/LogoutPopup";
import { useCookies } from "react-cookie";
import useUserStore from "@/store/User/useUserStore";

export default function NavigationList({ onClose }: { onClose?: () => void }) {
  const { t } = useTranslation(["students", "auth"]);
  const [isVisible, setIsVisible] = useState(false);
  const { setIsAuthenticated } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [_cookies, _setCookie, removeCookie] = useCookies(["token"]);

  const navigation = useMemo(
    () => [
      {
        id: 1,
        text: t("students_data"),
        icon: "student",
        path: "/dashboard/students",
      },
    ],
    [t]
  );

  const selectedItem = useMemo(() => {
    const matchingItem = navigation.find((item) =>
      location.pathname.startsWith(item.path)
    );
    return matchingItem ? matchingItem.id : null;
  }, [location.pathname, navigation]);

  const handleItemClick = useCallback(
    (
      e: ItemClickEvent<{
        id: number;
        text: string;
        icon: string;
        path: string;
      }>
    ) => {
      navigate(e?.itemData?.path!);
      onClose?.();
    },
    [navigate, onClose]
  );

  return (
    <div
      style={{ height: window.innerHeight - 56.8 }}
      className="sidebar flex flex-col justify-between w-60 !border-e !border-[#E8E8E8] bg-white"
    >
      <List
        width={240}
        keyExpr="id"
        dataSource={navigation}
        selectionMode="single"
        selectedItemKeys={selectedItem ? [selectedItem] : []}
        onItemClick={handleItemClick}
        className="panel-list"
      />
      <Button
        text={t("auth:logout.title")}
        icon="logout"
        className="logout-button"
        stylingMode="text"
        width="100%"
        onClick={() => {
          setIsVisible(true);
        }}
      />
      <LogoutPopup
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onConfirm={() => {
          setIsAuthenticated(false);
          removeCookie("token", { path: "/" });
          navigate("/auth/login");
        }}
      />
    </div>
  );
}
