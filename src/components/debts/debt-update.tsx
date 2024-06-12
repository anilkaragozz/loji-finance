import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { Pencil } from "lucide-react";

const DebtSchema = z.object({
  debtName: z.string(),
  lenderName: z.string(),
  debtAmount: z.number(),
  interestRate: z.number(),
  description: z.string(),
  isActive: z.boolean(),
  amount: z.number(),
  paymentStart: z.string(),
  installment: z.number(),
});

export type DebptData = z.infer<typeof DebtSchema>;

const DebptUpdateForm = () => {
  const debptUpdateForm = useForm<DebptData>({
    resolver: zodResolver(DebtSchema),
    defaultValues: {},
  });

  const onSubmit = async (data: DebptData) => {
    console.log(data);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Debt</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Form {...debptUpdateForm}>
              <form
                onSubmit={debptUpdateForm.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={debptUpdateForm.control}
                  name="debtName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Debt Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the debt name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={debptUpdateForm.control}
                  name="lenderName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lender Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the lender name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={debptUpdateForm.control}
                  name="debtAmount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Debt Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the debt amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={debptUpdateForm.control}
                  name="interestRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Interest Rate</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the interest rate"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={debptUpdateForm.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={debptUpdateForm.control}
                  name="isActive"
                  render={() => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Switch id="isActice" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={debptUpdateForm.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the amount"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={debptUpdateForm.control}
                  name="paymentStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Start</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the payment start"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={debptUpdateForm.control}
                  name="installment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Installment</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the installment"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DebptUpdateForm;
