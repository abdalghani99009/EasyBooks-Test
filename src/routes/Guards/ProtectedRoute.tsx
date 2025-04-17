import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({
  navigateTo,
  isAuthorized,
}: {
  navigateTo?: string;
  isAuthorized: boolean;
}) {
  return isAuthorized ? (
    <Outlet />
  ) : (
    <Navigate replace={false} to={navigateTo || "/"} />
  );
}
