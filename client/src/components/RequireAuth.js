import { useContext, useEffect } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { AuthCtx } from "../Contexts/AuthCtx";

const RequireAuth = ({ allowedRoles }) => {
  const { auth, checkAuth } = useContext(AuthCtx);
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  const location = useLocation();

  if (auth === null) {
    return null;
  }

  return auth?.user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
