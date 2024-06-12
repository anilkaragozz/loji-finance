import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/general/navbar";

const PrivateRoute = () => {
  const { state } = useAuth();
  const { accessToken } = state;

  return accessToken ? (
    <>
      <Navbar />
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <Outlet />
        </main>
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
