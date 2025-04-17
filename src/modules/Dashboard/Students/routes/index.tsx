import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
const StudentsData = lazy(
  () => import("@/modules/Dashboard/Students/pages/Students-data"),
);

export default function StudentsRoutes() {
  return (
    <Routes>
      <Route path="/students-data" element={<StudentsData />} />
    </Routes>
  );
}
