import { LanguageItem } from "@/common/types/i18n/langauge-select";
import { TranslationIcon } from "../../ui/icons";
import TextBox from "devextreme-react/cjs/text-box";

export default function FieldTemplate({ data }: { data?: LanguageItem }) {
  return (
    <div className="flex gap-1 ms-4 max-h-9 justify-center max-w-20 items-center">
      <TranslationIcon />
      <TextBox
        inputAttr={{
          class: "language-name",
        }}
        defaultValue={data && data.text}
        readOnly={true}
      />
    </div>
  );
}
