import { SelectBox } from "devextreme-react/select-box";
import { cultureCode } from "@/common/types/i18n";
import i18n from "@/config/i18n";
import FieldTemplate from "./FieldTemplate";
import { LanguageItem } from "@/common/types/i18n/langauge-select";
import useLanguageSelect from "@/common/hooks/i18n/useLanguageSelect";

export default function LanguageSelect() {
  const { dataSource, setCultureCode } = useLanguageSelect();

  return (
    <SelectBox
      dataSource={dataSource}
      stylingMode="outlined"
      onValueChange={(value: cultureCode) => setCultureCode(value)}
      defaultValue={i18n.language === "en" ? cultureCode.En : cultureCode.Ar}
      valueExpr="id"
      className="language-select"
      elementAttr={{ style: { width: "fit-content" } }}
      displayExpr="text"
      fieldRender={(data: LanguageItem) => <FieldTemplate data={data} />}
    />
  );
}
