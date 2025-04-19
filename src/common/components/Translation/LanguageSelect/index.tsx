import { SelectBox } from "devextreme-react/select-box";
import { cultureCode } from "@/common/types/i18n";
import FieldTemplate from "./FieldTemplate";
import { LanguageItem } from "@/common/types/i18n/langauge-select";
import useLanguageSelect from "@/common/hooks/i18n/useLanguageSelect";
import "./index.css";

export default function LanguageSelect() {
  const { dataSource, setCultureCode, currentCultureCode } =
    useLanguageSelect();

  return (
    <SelectBox
      dataSource={dataSource}
      stylingMode="outlined"
      onValueChange={(value: cultureCode) => setCultureCode(value)}
      value={currentCultureCode}
      valueExpr="id"
      className="language-select"
      elementAttr={{ style: { width: "fit-content" } }}
      displayExpr="text"
      fieldRender={(data: LanguageItem) => <FieldTemplate data={data} />}
    />
  );
}
