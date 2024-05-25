import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const authToken = sessionStorage.getItem("authToken");
  return authToken ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
