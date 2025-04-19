import useFetch from "@/common/hooks/APi/Fetch/useFetch";
import { useFilter } from "@/common/hooks/APi/Filter/useFilter";
import { usePOST } from "@/common/hooks/APi/Post/usePost";
import { useScreenSize } from "@/common/hooks/media-query/useScreenSize";
import {
  BulkStudent,
  BulkUpdatePayload,
  Gender,
  Grade,
  Student,
} from "@/modules/Dashboard/Students/types/Students-data";
import useI18nStore from "@/store/i18n/useI18nStore";
import { AxiosError } from "axios";
import { SavedEvent } from "devextreme/ui/data_grid";
import notify from "devextreme/ui/notify";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function useStudentsData() {
  const { t } = useTranslation(["students", "common"]);
  const { currentCultureCode } = useI18nStore();
  const { searchParams } = useFilter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const params = searchParams.toString();
  const { isSmall } = useScreenSize();
  const { data, isLoading } = useFetch<Student[]>({
    url: `Student/GetAll${params ? `?${params}` : ""}`,
    key: [`Student/GetAll${params ? `?${params}` : ""}`],
    queryOptions: { staleTime: 0 },
  });
  const { submit, mutation } = usePOST<BulkUpdatePayload>();

  const gradesFetch = useFetch<Grade[]>({
    url: "Settings/GetAllGrades",
    key: ["Settings/GetAllGrades"],
  });

  const gendersFetch = useFetch<Gender[]>({
    url: "Settings/GetAllGenders",
    key: ["Settings/GetAllGenders"],
  });

  const grades = gradesFetch.data?.map((g) => ({
    id: g.id,
    name: g.translations.find((t) => t.cultureCode === currentCultureCode)
      ?.name,
  }));

  const genders = gendersFetch.data?.map((g) => ({
    id: g.id,
    name: g.translations.find((t) => t.cultureCode === currentCultureCode)
      ?.name,
  }));
  const { dir } = useI18nStore();
  const isRtl = dir === "rtl";

  const handleDataSaved = async (e: SavedEvent<Student, any>) => {
    const changes = e.changes;
    const addedStudent = changes
      .filter((c) => c.type === "insert")
      .map((c) => ({
        ...c.data,
        grade: c.data.grade?.id,
        gender: c.data.gender?.id,
      })) as BulkStudent[];

    const editedStudent = changes
      .filter((c) => c.type === "update")
      .map((c) => ({
        ...c.data,
        id: c.key,
        grade: c.data.grade?.id,
        gender: c.data.gender?.id,
      })) as BulkStudent[];

    const deleteId = changes
      .filter((c) => c.type === "remove")
      .map((c) => c.key);
    const payload: BulkUpdatePayload = {
      addedStudent,
      editedStudent,
      deleteId,
    };
    await handleSubmit(payload);
  };

  const handleSubmit = async (payload: BulkUpdatePayload) => {
    await submit({
      url: "Student/Bulk",
      data: payload,
      mutateOptions: {
        onSuccess: () => {
          notify(t("submit_success"), "success");
        },
        onError: handleError,
      },
    });
  };

  const handleError = (error: Error | AxiosError) => {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    console.log(status);
    if (status === 422 || status === 400) {
      notify(axiosError.message, "error");
    }
  };

  return {
    t,
    data,
    isLoading,
    isRtl,
    currentCultureCode,
    handleDataSaved,
    genders,
    grades,
    isPending: mutation.isPending,
    isScreenSmall: isSmall,
    isDeleteOpen,
    setIsDeleteOpen,
  };
}
