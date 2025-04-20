import PagesLoader from "@/common/components/Loading/PagesLoader";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Guards/ProtectedRoute";
import useUserStore from "@/store/User/useUserStore";

const AuthRoutes = lazy(() => import("@/modules/Auth/routes"));
const StudentsRoutes = lazy(
  () => import("@/modules/Dashboard/Students/routes")
);
const DashboardLayout = lazy(() => import("@/modules/Dashboard/layouts"));

export default function AppRoutes() {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  return (
    <div>
      <Suspense fallback={<PagesLoader />}>
        <Routes>
          <Route
            element={
              <ProtectedRoute
                isAuthorized={!isAuthenticated}
                navigateTo="/dashboard/students"
              />
            }
          >
            <Route path="/auth/*" element={<AuthRoutes />} />
          </Route>
          <Route
            element={
              <ProtectedRoute
                isAuthorized={isAuthenticated}
                navigateTo="/auth/login"
              />
            }
          >
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="students/*" element={<StudentsRoutes />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}
