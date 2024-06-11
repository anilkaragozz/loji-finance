import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { loginFn } from "@/services/api";

export default function useLogin() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: loginFn,
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Login successful",
        description: "You have successfully logged in.",
      });
    },
  });
}
