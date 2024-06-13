import Login from "@/pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard";
import PrivateRoute from "@/PrivateRouter";
import Register from "@/pages/auth/Register";
import Debts from "@/pages/debts/Debts";
import Payment from "@/pages/payment/Payment";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/debts" element={<Debts />} />
          <Route path="/payment-plan/:id" element={<Payment />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
