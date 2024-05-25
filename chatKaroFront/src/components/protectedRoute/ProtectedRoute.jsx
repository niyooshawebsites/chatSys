import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = ({ authToken }) => {
  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
