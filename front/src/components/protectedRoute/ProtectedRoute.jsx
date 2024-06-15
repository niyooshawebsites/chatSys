import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const authToken = sessionStorage.getItem("authToken");
  const isVerified = sessionStorage.getItem("isVerified");

  if (isVerified === "false") {
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("chatKaro_username");
    sessionStorage.removeItem("isVerified");
  }

  return authToken && isVerified === "true" ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
