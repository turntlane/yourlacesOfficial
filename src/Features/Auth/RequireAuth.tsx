//@ts-nocheck
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const RequireAuth = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  console.log("require auth: ", isAuthenticated);
  const content = isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  return content;
};
export default RequireAuth;
