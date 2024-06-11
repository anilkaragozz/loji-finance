import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const PrivateRoute = () => {
  const { state } = useAuth();
  const { accessToken } = state;

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
