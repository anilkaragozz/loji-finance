import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "@/services/api";

export function useGetDebts() {
  return useQuery({
    queryKey: ["getDebts"],
    queryFn: () => axiosClient.get("/finance/debt").then((res) => res.data),
  });
}

export function useGetDebtById(id: string) {
  return useQuery({
    queryKey: ["getDebtById", id],
    queryFn: () =>
      axiosClient.get(`/finance/debt/${id}`).then((res) => res.data),
  });
}
