import DashboardInfo from "@/components/dashboard/dasboard-info";
import DebtTable from "@/components/debts/debt-list";

const Dashboard = () => {
  return (
    <>
      <div className="grid gap-2 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <DashboardInfo />
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
        <DebtTable />
      </div>
    </>
  );
};

export default Dashboard;
