import { useMutation } from "@tanstack/react-query";
import { axiosClient } from "@/services/api";
import { DebtCreateData } from "@/components/debts/debt-create";
import { toast } from "@/components/ui/use-toast";

export function useCreateDebt() {
  return useMutation({
    mutationKey: ["createDebt"],
    mutationFn: (data: DebtCreateData) =>
      axiosClient.post("/finance/debt", data).then((res) => res.data),
    onSuccess: () => {
      toast({
        title: "Debt created successfully",
      });
      window.location.reload();
    },
  });
}

export function useUpdateDebtById(id: string) {
  return useMutation({
    mutationKey: ["updateDebt"],
    mutationFn: (data: DebtCreateData) =>
      axiosClient.put(`/finance/debt/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      toast({
        title: "Debt deleted successfully",
      });
      window.location.reload();
    },
  });
}

export function useDeleteDebtById(id: string) {
  return useMutation({
    mutationKey: ["deleteDebt"],
    mutationFn: () =>
      axiosClient.delete(`/finance/debt/${id}`).then((res) => res.data),
    onSuccess: () => {
      toast({
        title: "Debt deleted successfully",
      });
      window.location.reload();
    },
  });
}

interface Payment {
  id: string;
  paymentDate: Date;
  paymentAmount: number;
  isPaid: boolean;
}

interface PaymentPlanData {
  payments: Payment[];
}
export function useUpdatePaymentPlan() {
  return useMutation({
    mutationFn: ({ data }: { data: PaymentPlanData }) => {
      const updatePromises = data.payments.map((payment) => {
        const { id, ...paymentData } = payment;
        return axiosClient.put(`/finance/payment-plans/${id}`, paymentData);
      });

      return Promise.all(updatePromises).then((responses) =>
        responses.map((res) => res.data)
      );
    },
    onSuccess: () => {
      window.location.reload();
    },
  });
}
