import { useBarChartData } from "@/hooks/useChartData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from "recharts";

const BarCharts = () => {
  const chartData = useBarChartData();

  return (
    <BarChart
      width={400}
      height={300}
      data={chartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
      style={{ position: "static" }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Legend wrapperStyle={{ position: "static" }} />
      <Bar dataKey="amount" fill="#8884d8" />
      <Bar dataKey="debtAmount" fill="#82ca9d" />
    </BarChart>
  );
};

export default BarCharts;
