import PagesLoader from "@/common/components/Loading/PagesLoader";
import { Suspense, lazy } from "react";

const LoginForm = lazy(() => import("../../components/Login/LoginForm"));

export default function Login() {
  return (
    <Suspense fallback={<PagesLoader />}>
      <LoginForm />
    </Suspense>
  );
}
