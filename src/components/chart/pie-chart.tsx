import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { usePieChartData } from "@/hooks/useChartData";

const PieCharts = () => {
  const pieChartData = usePieChartData();

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart style={{ position: "none" }}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={pieChartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieCharts;
