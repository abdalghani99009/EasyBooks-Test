import { Suspense, lazy } from "react";
import useStudentsData from "../../hooks/Students-data";
import PagesLoader from "@/common/components/Loading/PagesLoader";

const StudentsGrid = lazy(() => import("../StudentsGrid"));
const StudentsGridSkeleton = lazy(
  () => import("../StudentsGrid/StudentsGridSkeleton")
);

export default function StudentsData() {
  const { isLoading, isPending, ...gridProps } = useStudentsData();
  return (
    <div className="bg-white p-4 md:p-6 rounded-lg shadow w-full overflow-x-auto">
      <h2 className="text-2xl font-medium mb-4">
        {gridProps.t("students_data")}
      </h2>

      <PagesLoader isVisible={isLoading || isPending} />
      <Suspense fallback={<StudentsGridSkeleton />}>
        <StudentsGridSkeleton />
      </Suspense>
    </div>
  );
}
