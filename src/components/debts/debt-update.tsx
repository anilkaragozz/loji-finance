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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import { Pencil, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export const DebtSchema = z.object({
  id: z.string(),
  debtName: z.string(),
  lenderName: z.string(),
  debtAmount: z.string(),
  interestRate: z.string(),
  description: z.string(),
  isActive: z.boolean(),
  amount: z.string(),
  paymentStart: z.date(),
  installment: z.string(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  paymentPlan: z.array(
    z.object({
      paymentDate: z.date(),
      paymentAmount: z.string(),
    })
  ),
});

export type DebtData = z.infer<typeof DebtSchema>;

const DebtUpdateForm = () => {
  const debtUpdateForm = useForm<DebtData>({
    resolver: zodResolver(DebtSchema),
    defaultValues: {
      id: "get from row",
      debtName: "",
      lenderName: "",
      debtAmount: "",
      interestRate: "",
      description: "",
      isActive: false,
      amount: "",
      paymentStart: new Date(),
      installment: "",
      userId: "get from row",
      createdAt: "",
      updatedAt: "",
      paymentPlan: [
        {
          paymentDate: new Date(),
          paymentAmount: "",
        },
      ],
    },
  });

  const onSubmit = async (data: DebtData) => {
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
            <Form {...debtUpdateForm}>
              <form
                onSubmit={debtUpdateForm.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={debtUpdateForm.control}
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
                  control={debtUpdateForm.control}
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
                  control={debtUpdateForm.control}
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
                  control={debtUpdateForm.control}
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
                  control={debtUpdateForm.control}
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
                  control={debtUpdateForm.control}
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
                  control={debtUpdateForm.control}
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
                  control={debtUpdateForm.control}
                  name="paymentStart"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Start</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[180px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={debtUpdateForm.control}
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

export default DebtUpdateForm;
