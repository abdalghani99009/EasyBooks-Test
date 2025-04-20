import PagesLoader from "@/common/components/Loading/PagesLoader";
import { Suspense, lazy } from "react";

const StudentsData = lazy(() => import("../../components/Students-data"));

export default function StudentsDataPage() {
  return (
    <Suspense fallback={<PagesLoader shading={false} />}>
      <StudentsData />
    </Suspense>
  );
}
