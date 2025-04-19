import Toolbar, { Item } from "devextreme-react/toolbar";
import Button from "devextreme-react/button";
import "./index.css";
import { Logo } from "@/common/components/ui/icons";
import LanguageSelect from "@/common/components/Translation/LanguageSelect";
import useI18nStore from "@/store/i18n/useI18nStore";
import useUserStore from "@/store/User/useUserStore";
import profileImage from "@/common/assets/images/student/profile.png";

export default function Header({
  menuToggleEnabled,
  title,
  toggleMenu,
}: {
  menuToggleEnabled: boolean;
  title: string;
  toggleMenu: () => void;
}) {
  const { dir } = useI18nStore();
  const { user } = useUserStore();
  return (
    <header
      className={
        "px-2 sm:px-6 bg-white z-20 flex relative !border-b !border-[#E8E8E8]"
      }
    >
      <Toolbar rtlEnabled={dir === "rtl"} className={"header-toolbar"}>
        <Item
          visible={menuToggleEnabled}
          location={"before"}
          widget={"dxButton"}
          cssClass={"menu-button "}
        >
          <Button icon="menu" stylingMode="text" onClick={toggleMenu} />
        </Item>
        <Item
          location={"before"}
          cssClass={"header-title"}
          component={Logo}
          visible={!!title}
        />

        <Item location="after" locateInMenu="auto">
          <div className="flex items-center gap-2 me-4">
            {user || "user"}
            <img src={profileImage} width={35} height={35} />
          </div>
        </Item>
        <Item location="after" locateInMenu="auto" component={Language} />
      </Toolbar>
    </header>
  );
}

const Language = () => {
  return (
    <div className="max-w-40">
      <LanguageSelect />
    </div>
  );
};
