import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetPaymentPlan } from "@/services/hooks/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useUpdatePaymentPlan } from "@/services/hooks/mutations";
import { Switch } from "@/components/ui/switch";
import { FormField, FormItem, FormControl, Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const PaymentPlanSchema = z.object({
  payments: z.array(
    z.object({
      id: z.string(),
      paymentDate: z.date(),
      paymentAmount: z.coerce.number(),
      isPaid: z.boolean(),
    })
  ),
});
export type PaymentPlanData = z.infer<typeof PaymentPlanSchema>;

const Payment = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetPaymentPlan(id!);

  const updatePaymentPlanForm = useForm<PaymentPlanData>({
    resolver: zodResolver(PaymentPlanSchema),
    defaultValues: {
      payments: [],
    },
  });
  const { fields, append } = useFieldArray({
    control: updatePaymentPlanForm.control,
    name: "payments",
  });

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data.forEach((payment: any) => {
        append({
          id: payment.id,
          paymentDate: new Date(payment.paymentDate),
          paymentAmount: payment.paymentAmount,
          isPaid: payment.isPaid,
        });
      });
    }
  }, [data, append]);

  const { mutate } = useUpdatePaymentPlan();

  const onSubmit = () => {
    const originalPayments = updatePaymentPlanForm.getValues().payments;

    const modifiedPayments = fields
      .filter((_, index) => {
        const originalPayment = originalPayments[index];
        const currentPayment = fields[index];
        return (
          originalPayment.paymentAmount !== currentPayment.paymentAmount ||
          originalPayment.isPaid !== currentPayment.isPaid
        );
      })
      .map((field) => ({
        id: field.id,
        paymentDate: field.paymentDate,
        paymentAmount: field.paymentAmount,
        isPaid: field.isPaid,
      }));

    const modifiedData: PaymentPlanData = {
      payments: modifiedPayments,
    };

    mutate({ data: modifiedData });
  };
  return (
    <>
      {data && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Payment Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...updatePaymentPlanForm}>
              <form onSubmit={updatePaymentPlanForm.handleSubmit(onSubmit)}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payment Date</TableHead>
                      <TableHead>Payment Amount</TableHead>
                      <TableHead>Is Paid</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((field, index) => (
                      <TableRow key={field.id}>
                        <TableCell>
                          {format(field.paymentDate, "dd-MM-yyyy")}
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={updatePaymentPlanForm.control}
                            name={`payments.${index}.paymentAmount`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="number"
                                    {...field}
                                    onChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <FormField
                            control={updatePaymentPlanForm.control}
                            name={`payments.${index}.isPaid`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button type="submit">Save</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default Payment;
