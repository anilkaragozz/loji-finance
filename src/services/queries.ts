import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/services/api";
import { DebtListData } from "@/components/debts/debt-list";

export function useGetDebts() {
  return useQuery<DebtListData[]>({
    queryKey: ["getDebts"],
    queryFn: () =>
      axiosClient.get("/finance/debt").then((res) => res.data.data),
  });
}

export function useGetDebtById(id: string) {
  return useQuery({
    queryKey: ["getDebtById", id],
    queryFn: () =>
      axiosClient.get(`/finance/debt/${id}`).then((res) => res.data),
  });
}
