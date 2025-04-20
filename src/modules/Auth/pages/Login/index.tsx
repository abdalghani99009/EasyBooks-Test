import { lazy } from "react";

const LoginForm = lazy(() => import("../../components/Login/LoginForm"));

export default function Login() {
  return <LoginForm />;
}
