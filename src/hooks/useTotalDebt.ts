import { DebtData } from "@/components/debts/debt-update";
import { useGetDebts } from "@/services/queries";

export const useTotalDebt = () => {
  const { data } = useGetDebts();

  if (!data) return 0;
  const totalDebt = data.reduce(
    (acc: number, debt: DebtData) => acc + debt.debtAmount,
    0
  );
  return totalDebt;
};
