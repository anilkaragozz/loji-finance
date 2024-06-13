import { useGetDebts } from "@/services/queries";

export const useBarChartData = () => {
  const { data } = useGetDebts();

  if (!data) return [];

  const chartData = data.map((debt) => ({
    name: debt.debtName,
    debtAmount: debt.debtAmount,
    amount: debt.amount,
  }));

  return chartData;
};

export const usePieChartData = () => {
  const { data } = useGetDebts();

  if (!data) return [];

  const pieChartData = data.map((debt) => ({
    name: debt.debtName,
    value: debt.debtAmount,
  }));
  return pieChartData;
};
