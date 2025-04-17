import PagesLoader from "@/common/components/Loading/PagesLoader";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Guards/ProtectedRoute";
import useUserStore from "@/store/User/useUserStore";

const AuthRoutes = lazy(() => import("@/modules/Auth/routes"));
const StudentsRoutes = lazy(
  () => import("@/modules/Dashboard/Students/routes")
);

export default function AppRoutes() {
  const { isAuthenticated } = useUserStore();
  return (
    <div>
      <Suspense fallback={<PagesLoader />}>
        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />
          <Route element={<ProtectedRoute isAuthorized={isAuthenticated} />}>
            <Route path="/students/*" element={<StudentsRoutes />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}
