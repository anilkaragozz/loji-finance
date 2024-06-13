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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Pencil, CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addMonths } from "date-fns";
import { useGetDebtById } from "@/services/queries";
import { useEffect } from "react";

export const DebtSchema = z.object({
  id: z.string(),
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

export type DebtData = z.infer<typeof DebtSchema>;

const DebtUpdateForm = (params: { id: string }) => {
  const { data } = useGetDebtById(params.id);

  const handlePaymentPlan = (data: DebtData) => {
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

    debtUpdateForm.setValue("paymentPlan", paymentPlan);
  };

  const debtUpdateForm = useForm<DebtData>({
    resolver: zodResolver(DebtSchema),
    defaultValues: {
      id: "",
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

  useEffect(() => {
    if (data) {
      debtUpdateForm.reset({
        id: data?.id,
        debtName: data?.debtName,
        lenderName: data?.lenderName,
        debtAmount: data?.debtAmount,
        interestRate: data?.interestRate,
        description: data?.description,
        amount: data?.amount,
        paymentStart: data?.paymentStart,
        installment: data?.installment,
        paymentPlan: data?.paymentPlan,
      });
      console.log(debtUpdateForm.reset(data), "useEffect");
    }
  }, [data, debtUpdateForm]);

  const onSubmit = async (data: DebtData) => {
    console.log(data);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            onClick={() => {
              console.log(data);
            }}
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="min-w-[50%] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Debt</DialogTitle>
          </DialogHeader>
          <div>
            <Form {...debtUpdateForm}>
              <form
                onSubmit={debtUpdateForm.handleSubmit(onSubmit)}
                className="grid grid-cols-2 gap-4"
              >
                <div className="col-span-1 space-y-4">
                  <FormField
                    control={debtUpdateForm.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Debt id</FormLabel>
                        <FormControl>
                          <Input disabled={true} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={debtUpdateForm.control}
                    name="debtName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Debt Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
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
                          <Input {...field} />
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
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-1 space-y-4">
                  <FormField
                    control={debtUpdateForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input {...field} />
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
                          <Input {...field} />
                        </FormControl>
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
                          <Input {...field} />
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
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-2">
                  <FormField
                    control={debtUpdateForm.control}
                    name="paymentPlan"
                    render={({ field }) => (
                      <>
                        <FormItem>
                          <FormLabel>Payment Plan</FormLabel>
                          <ScrollArea className="h-72 w-full rounded-md border">
                            <div className="p-4">
                              {field.value &&
                                field.value.map((paymentPlan, index) => (
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
                                      Payment Amount:{" "}
                                      {paymentPlan.paymentAmount}
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

                <div className="col-span-2 flex justify-center items-center my-2">
                  <Button type="submit">Update Debt</Button>
                </div>
              </form>
            </Form>
            <div className="flex justify-center items-center">
              <Button
                variant="outline"
                onClick={() => {
                  handlePaymentPlan(debtUpdateForm.getValues());
                }}
              >
                Update Payment Plan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DebtUpdateForm;
