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
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

export default function useStudentsData() {
  const { t } = useTranslation(["students", "common"]);
  const { currentCultureCode, dir } = useI18nStore();
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

  const grades = useMemo(() => {
    return gradesFetch.data?.map((g) => ({
      id: g.id,
      name: g.translations.find((t) => t.cultureCode === currentCultureCode)
        ?.name,
    }));
  }, [gradesFetch.data, currentCultureCode]);

  const genders = useMemo(() => {
    return gendersFetch.data?.map((g) => ({
      id: g.id,
      name: g.translations.find((t) => t.cultureCode === currentCultureCode)
        ?.name,
    }));
  }, [gendersFetch.data, currentCultureCode]);

  const isRtl = useMemo(() => dir === "rtl", [dir]);

  const handleError = useCallback((error: Error | AxiosError) => {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;

    console.log(status);
    if (status === 422 || status === 400) {
      notify(axiosError.message, "error");
    }
  }, []);

  const handleSubmit = useCallback(
    async (payload: BulkUpdatePayload) => {
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
    },
    [submit, t, handleError]
  );

  const handleDataSaved = useCallback(
    async (e: SavedEvent<Student, any>) => {
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
    },
    [handleSubmit]
  );

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
