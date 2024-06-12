import Login from "@/pages/auth/Login";
import { Route, Routes } from "react-router-dom";
import Dashboard from "@/pages/dashboard/Dashboard";
import PrivateRoute from "@/PrivateRouter";
import Register from "@/pages/auth/Register";
import Debts from "@/pages/debts/Debts";
import PaymentPlan from "@/components/payment/payment-plan";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/debts" element={<Debts />} />
          <Route path="/payment-plan" element={<PaymentPlan />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
