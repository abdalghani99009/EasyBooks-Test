import useLogin from "@/modules/Auth/hooks/Login";
import { Form, Item, SimpleItem } from "devextreme-react/form";
import { RequiredRule, StringLengthRule } from "devextreme-react/validator";
import { LoadPanel } from "devextreme-react/load-panel";

export default function LoginForm() {
  const { t, handleSubmit, setFormData, isPending } = useLogin();

  return (
    <>
      <LoadPanel visible={isPending} shading shadingColor="rgba(0,0,0,0.4)" />
      <div className="flex flex-col gap-8 sm:gap-12 p-6 sm:p-12 max-w-lg w-full bg-white rounded-lg justify-center">
        <h1 className="text-3xl font-semibold text-secondary">
          {t("login.title")}
        </h1>
        <form onSubmit={handleSubmit}>
          <Form
            onFieldDataChanged={(e) => {
              setFormData(e.component.option("formData"));
            }}
            labelMode="floating"
          >
            <SimpleItem
              dataField="userName"
              label={{ text: t("login.username") }}
              editorType="dxTextBox"
            >
              <RequiredRule
                message={t("common:validation.required", {
                  target: t("login.username"),
                })}
              />
              <StringLengthRule
                message={t("common:validation.min", {
                  min: 3,
                  target: t("login.username"),
                })}
                min={3}
              />
            </SimpleItem>

            <SimpleItem
              dataField="password"
              label={{ text: t("login.password") }}
              editorType="dxTextBox"
              editorOptions={{
                mode: "password",
              }}
            >
              <RequiredRule
                message={t("common:validation.required", {
                  target: t("login.password"),
                })}
              />
              <StringLengthRule
                message={t("common:validation.min", {
                  min: 8,
                  target: t("login.password"),
                })}
                min={8}
              />
            </SimpleItem>

            <Item
              itemType="button"
              buttonOptions={{
                text: t("login.sign_in"),
                type: "default",

                useSubmitBehavior: true,
                height: 45,
                elementAttr: { width: "100%" },
              }}
            />
          </Form>
        </form>
      </div>
    </>
  );
}
