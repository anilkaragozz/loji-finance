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
import { format, addMonths } from "date-fns";
import { z } from "zod";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlusCircle, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCreateDebt } from "@/services/mutations";

const DebtCreateSchema = z.object({
  debtName: z.string(),
  lenderName: z.string(),
  debtAmount: z.coerce.number(),
  interestRate: z.coerce.number(),
  description: z.string(),
  amount: z.coerce.number(),
  paymentStart: z.date(),
  installment: z.coerce.number(),
  paymentPlan: z.array(
    z.object({
      paymentDate: z.date(),
      paymentAmount: z.coerce.number(),
    })
  ),
});

export type DebtCreateData = z.infer<typeof DebtCreateSchema>;

const DebtCreateForm = () => {
  const debtCreateForm = useForm<DebtCreateData>({
    resolver: zodResolver(DebtCreateSchema),
    defaultValues: {
      debtName: "",
      lenderName: "",
      debtAmount: 0,
      interestRate: 0,
      description: "",
      amount: 0,
      paymentStart: new Date(),
      installment: 0,
      paymentPlan: [
        {
          paymentDate: new Date(),
          paymentAmount: 0,
        },
      ],
    },
  });
  const { setValue } = debtCreateForm;
  const { mutate } = useCreateDebt();

  const onSubmit = async (data: DebtCreateData) => {
    mutate(data);
    console.log(data);
  };

  const handlePaymentPlan = async (data: DebtCreateData) => {
    const { amount, installment, interestRate, paymentStart } = data;

    const totalAmount =
      amount * Math.pow(1 + interestRate / 100, installment / 12);

    const monthlyPayment = totalAmount / installment;

    const paymentPlan = Array.from({ length: installment }, (_, i) => {
      return {
        paymentAmount: monthlyPayment,
        paymentDate: addMonths(paymentStart, i),
      };
    });

    setValue("paymentPlan", paymentPlan);
    console.log("paymentPlan", paymentPlan);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            Create New Debt <PlusCircle className="h-4 w-4 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent className=" min-w-[50%] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Debt</DialogTitle>
          </DialogHeader>
          <div>
            <Form {...debtCreateForm}>
              <form
                onSubmit={debtCreateForm.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="col-span-1 space-y-4">
                  <FormField
                    control={debtCreateForm.control}
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
                    control={debtCreateForm.control}
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
                    control={debtCreateForm.control}
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
                    control={debtCreateForm.control}
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
                </div>
                <div className="col-span-1 space-y-4">
                  <FormField
                    control={debtCreateForm.control}
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
                    control={debtCreateForm.control}
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
                    control={debtCreateForm.control}
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
                    control={debtCreateForm.control}
                    name="paymentStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mr-4">Payment Start</FormLabel>
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
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <Button
                    className="w-full"
                    onClick={() =>
                      handlePaymentPlan(debtCreateForm.getValues())
                    }
                  >
                    Create Payment Plan
                  </Button>
                </div>

                <div className="col-span-2">
                  <FormField
                    control={debtCreateForm.control}
                    name="paymentPlan"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Payment Plan</FormLabel>
                          <ScrollArea className="h-72 w-full rounded-md border">
                            <div className="p-4">
                              {field.value.map((paymentPlan, index) => (
                                <div key={index}>
                                  <FormLabel className="text-blue-600">
                                    Installment {index + 1}
                                  </FormLabel>
                                  <div className="text-left font-normal">
                                    {paymentPlan.paymentDate ? (
                                      <span>
                                        Payment Date:{" "}
                                        {format(
                                          new Date(paymentPlan.paymentDate),
                                          "PPP"
                                        )}
                                      </span>
                                    ) : (
                                      <span>No date selected</span>
                                    )}
                                  </div>
                                  <span>
                                    Payment Amount: {paymentPlan.paymentAmount}
                                  </span>
                                  <Separator />
                                </div>
                              ))}
                            </div>
                          </ScrollArea>
                          <FormMessage />
                        </FormItem>
                      </>
                    )}
                  />
                </div>

                <div className="col-span-2 space-y-4">
                  <Button type="submit" className="w-full">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DebtCreateForm;
