import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "@/services/api";
import { DebtCreateData } from "@/components/debts/debt-create";

export function useCreateDebt() {
  return useMutation({
    mutationKey: ["createDebt"],
    mutationFn: (data: DebtCreateData) =>
      axiosClient.post("/finance/debt", data).then((res) => res.data),
  });
}

export function useUpdateDebtById(id: string) {
  return useMutation({
    mutationKey: ["updateDebt"],
    mutationFn: (data: DebtCreateData) =>
      axiosClient.put(`/finance/debt/${id}`, data).then((res) => res.data),
  });
}

export function useDeleteDebtById(id: string) {
  return useMutation({
    mutationKey: ["deleteDebt"],
    mutationFn: () =>
      axiosClient.delete(`/finance/debt/${id}`).then((res) => res.data),
  });
}
