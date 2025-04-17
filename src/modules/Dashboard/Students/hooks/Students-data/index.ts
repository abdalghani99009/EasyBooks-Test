import useFetch from "@/common/hooks/APi/Fetch/useFetch";
import { useFilter } from "@/common/hooks/APi/Filter/useFilter";
import { StudentsDataInterface } from "@/modules/Dashboard/Students/types/Students-data";

export default function useStudentsData() {
  const { searchParams } = useFilter();
  const params = searchParams.toString();
  const { data, isLoading } = useFetch<StudentsDataInterface>({
    url: `studentsdata${params ? `?${params}` : ""}`,
    key: [`studentsdata${params ? `?${params}` : ""}`],
  });

  return { data, isLoading };
}
