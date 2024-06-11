import Login from "@/pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard";
import PrivateRoute from "@/PrivateRouter";
import Register from "@/pages/auth/Register";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
