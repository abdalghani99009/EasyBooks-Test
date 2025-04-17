import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts";
const Login = lazy(() => import("@/modules/Auth/pages/Login"));

export default function AuthRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}
