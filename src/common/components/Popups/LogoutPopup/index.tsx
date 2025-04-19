import { Popup } from "devextreme-react/popup";
import Button from "devextreme-react/button";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import SignoutImage from "@/common/assets/images/signout.svg";
import useI18nStore from "@/store/i18n/useI18nStore";

export default function LogoutPopup({
  isVisible,
  setIsVisible,
  onConfirm,
}: {
  isVisible: boolean;
  setIsVisible: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
}) {
  const { t } = useTranslation("auth");
  const { dir } = useI18nStore();

  return (
    <Popup
      visible={isVisible}
      rtlEnabled={dir === "rtl"}
      onHiding={() => setIsVisible(false)}
      showCloseButton
      titleRender={() => (
        <div className="flex gap-1 items-center">
          <img src={SignoutImage} />
          <h4 className="text-primary text-lg font-medium">
            {t("logout.title")}
          </h4>
        </div>
      )}
      width={500}
      height={300}
    >
      <div className="flex justify-between h-full pb-4 flex-col gap-4">
        <p>{t("logout.sure?")}</p>
        <div className="flex w-full justify-evenly gap-2">
          {" "}
          <Button
            text={t("logout.confirm")}
            type="default"
            elementAttr={{ width: "100%", height: "45px" }}
            onClick={() => {
              setIsVisible(false);
              onConfirm();
            }}
          />
          <Button
            text={t("logout.cancel")}
            elementAttr={{ width: "100%", height: "45px" }}
            stylingMode="outlined"
            onClick={() => setIsVisible(false)}
          />
        </div>
      </div>
    </Popup>
  );
}
