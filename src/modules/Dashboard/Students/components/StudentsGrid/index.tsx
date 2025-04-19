import DataGrid, {
  Column,
  Editing,
  SearchPanel,
  Scrolling,
  RequiredRule,
  Toolbar,
  Item,
  Lookup,
  Paging,
  Pager,
} from "devextreme-react/data-grid";
import useStudentsData from "../../hooks/Students-data";
import { Student } from "../../types/Students-data";
import "./index.css";
import { FilterByIcon } from "@/common/components/ui/icons";
import PagesLoader from "@/common/components/Loading/PagesLoader";

export default function StudentsGrid() {
  const {
    data,
    isRtl,
    t,
    isLoading,
    handleDataSaved,
    genders,
    grades,
    isPending,
    isScreenSmall,
  } = useStudentsData();

  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow w-full overflow-x-auto">
      <h2 className="text-2xl font-medium mb-4">{t("students_data")}</h2>

      <PagesLoader isVisible={isLoading || isPending} />
      <DataGrid<Student>
        dataSource={data}
        className="students-grid"
        keyExpr="id"
        showBorders={true}
        allowColumnResizing={true}
        onSaved={handleDataSaved}
        columnAutoWidth={true}
        wordWrapEnabled={true}
        rtlEnabled={isRtl}
        focusedRowEnabled={true}
        repaintChangesOnly={true}
        noDataText={t("no_data")}
      >
        <Editing
          mode="batch"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
        />
        <Paging enabled defaultPageSize={5} />
        <Pager
          showPageSizeSelector
          allowedPageSizes={[5, 10, 25]}
          displayMode="adaptive"
          visible
          showNavigationButtons
          showInfo
        />

        <SearchPanel
          visible={true}
          width={isScreenSmall ? 200 : 280}
          placeholder={t("search")}
        />
        <Scrolling mode="standard" />
        <Toolbar>
          {" "}
          {!isScreenSmall && (
            <Item location="before">
              <div className="flex text-base gap-2 items-center text-primary">
                <FilterByIcon />
                <span> {t("filter_by")}</span>
              </div>
            </Item>
          )}
          <Item name="searchPanel" location="before" />
          <Item name="addRowButton" location="after" />
          <Item name="saveButton" location="after" />
          <Item name="revertButton" location="after" />
          <Item name="deleteButton" location="after" />
        </Toolbar>

        {/* Columns */}
        <Column
          allowFiltering={false}
          dataField="firstName"
          allowSearch
          caption={t("first_name")}
        >
          <RequiredRule
            message={t("common:validation.required", {
              target: t("first_name"),
            })}
          />
        </Column>
        <Column
          allowFiltering={false}
          dataField="lastName"
          allowSearch
          caption={t("last_name")}
        >
          <RequiredRule
            message={t("common:validation.required", {
              target: t("last_name"),
            })}
          />
        </Column>
        <Column
          allowFiltering={false}
          allowSearch
          dataField="birthDate"
          dataType="date"
          caption={t("birth_date")}
        >
          <RequiredRule
            message={t("common:validation.required", {
              target: t("birth_date"),
            })}
          />
        </Column>
        <Column
          allowFiltering={false}
          allowSearch
          allowEditing
          dataField="grade.id"
          caption={t("grade")}
          editorOptions={{ width: 110 }}
        >
          <Lookup dataSource={grades} valueExpr="id" displayExpr="name" />
          <RequiredRule
            message={t("common:validation.required", {
              target: t("grade"),
            })}
          />
        </Column>
        <Column
          allowFiltering={false}
          allowSearch
          allowEditing
          dataField="gender.id"
          caption={t("gender")}
          editorOptions={{ width: 100 }}
        >
          {" "}
          <RequiredRule
            message={t("common:validation.required", {
              target: t("gender"),
            })}
          />
          <Lookup dataSource={genders} valueExpr="id" displayExpr="name" />
        </Column>
        <Column
          allowFiltering={false}
          allowSearch
          dataField="country"
          allowEditing
          caption={t("country")}
        >
          <RequiredRule
            message={t("common:validation.required", {
              target: t("country"),
            })}
          />
        </Column>
        <Column
          allowFiltering={false}
          allowSearch
          dataField="city"
          caption={t("city")}
        >
          <RequiredRule
            message={t("common:validation.required", {
              target: t("city"),
            })}
          />
        </Column>
        <Column
          allowFiltering={false}
          allowSearch
          allowEditing
          dataField="phone"
          caption={t("mobile")}
        >
          <RequiredRule
            message={t("common:validation.required", {
              target: t("mobile"),
            })}
          />
        </Column>
        <Column
          allowFiltering={false}
          allowSearch
          dataField="remarks"
          caption={t("notes")}
        />
      </DataGrid>
    </div>
  );
}
