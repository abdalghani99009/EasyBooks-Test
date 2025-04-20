import PagesLoader from "@/common/components/Loading/PagesLoader";
import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
const StudentsData = lazy(
  () => import("@/modules/Dashboard/Students/pages/Students-data")
);

export default function StudentsRoutes() {
  return (
    <Suspense fallback={<PagesLoader />}>
      <Routes>
        <Route path="/" element={<StudentsData />} />
      </Routes>
    </Suspense>
  );
}
