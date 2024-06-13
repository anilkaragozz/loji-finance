import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/services/api";
import { DebtListData } from "@/components/debts/debt-list";
import { PaymentPlanData } from "@/pages/payment/Payment";

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

export function useGetPaymentPlan(id: string) {
  return useQuery<PaymentPlanData[]>({
    queryKey: ["getPaymentPlan", id],
    queryFn: () =>
      axiosClient
        .get(`/finance/payment-plans/${id}`)
        .then((res) => res.data.data),
  });
}
