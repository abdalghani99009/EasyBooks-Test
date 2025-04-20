import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts";
import PagesLoader from "@/common/components/Loading/PagesLoader";
const Login = lazy(() => import("@/modules/Auth/pages/Login"));

export default function AuthRoutes() {
  return (
    <Suspense fallback={<PagesLoader />}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
