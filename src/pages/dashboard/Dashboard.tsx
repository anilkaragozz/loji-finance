import DashboardInfo from "@/components/dashboard/dasboard-info";
import DebtTable from "@/components/debts/debt-list";

const Dashboard = () => {
  return (
    <>
      <div className="grid gap-2 m-auto lg:m-auto md:grid-cols-2 md:gap-8 lg:grid-cols-2">
        <DashboardInfo />
      
      </div>
      <div className="grid gap-4 m-auto lg:-m-auto md:m-auto md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
        <DebtTable />
      </div>
    </>
  );
};

export default Dashboard;
