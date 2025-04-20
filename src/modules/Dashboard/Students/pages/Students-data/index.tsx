import { lazy } from "react";

const StudentsData = lazy(() => import("../../components/Students-data"));

export default function StudentsDataPage() {
  return <StudentsData />;
}
