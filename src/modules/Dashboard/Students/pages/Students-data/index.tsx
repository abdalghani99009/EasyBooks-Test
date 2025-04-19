import useStudentsData from "@/modules/Dashboard/Students/hooks/Students-data";
import StudentsData from "../../components/Students-data";

export default function StudentsDataPage() {
  const {} = useStudentsData();
  return (
    <div>
      <StudentsData />
    </div>
  );
}
