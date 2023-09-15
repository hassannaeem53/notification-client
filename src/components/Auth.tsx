import { Navigate, Outlet, useLocation } from "react-router-dom";

export const Auth = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
