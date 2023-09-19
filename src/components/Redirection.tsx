import { Navigate, Outlet, useLocation } from "react-router-dom";

export const Redirection = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  return token ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
