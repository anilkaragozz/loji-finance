import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FolderKanban } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import DebtUpdateForm from "@/components/debts/debt-update";
import DebtCreateForm from "@/components/debts/debt-create";
import { useGetDebts } from "@/services/hooks/queries";
import { OrbitProgress } from "react-loading-indicators";
import DebtDelete from "@/components/debts/debt-delete";
import { z } from "zod";
import { useTotalDebt } from "@/hooks/useTotalDebt";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const DebtListSchema = z.object({
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

export type DebtListData = z.infer<typeof DebtListSchema>;

const DebtTable = () => {
  const navigate = useNavigate();
  const totalDebt = useTotalDebt();
  const { data, error, isLoading } = useGetDebts();

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <OrbitProgress variant="disc" color="#319cd7" size="medium" />
      </div>
    );
  if (error) {
    return (
      <div className="flex justify-center items center text-red-700">
        Error: {error.message}
      </div>
    );
  }
  return (
    <>
      <Card className="max-w-md sm:max-w-2xl md:max-w-3xl lg:max-w-full">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Debts</CardTitle>
            <div className="flex justify-center items-center text-red-700 font-semibold">
              Total Debt: &nbsp;
              <p className=" text-black hover:text-red-700">$ {totalDebt}</p>
            </div>
          </div>

          <div className="ml-auto gap-1">
            <DebtCreateForm />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Debt Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Lender Name</TableHead>
                <TableHead>Debt Amount</TableHead>
                <TableHead>Interest Rate</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Payment Start</TableHead>
                <TableHead>Installment</TableHead>
                <TableHead className="text-black font-bold">
                  Edit Dept
                </TableHead>
                <TableHead className="text-black font-bold">
                  Payment Plan
                </TableHead>
                <TableHead className="text-black font-bold">
                  Delete Debt
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((debt: DebtListData) => (
                <TableRow key={debt.id}>
                  <TableCell>{debt.debtName}</TableCell>
                  <TableCell className="max-w-60">{debt.description}</TableCell>
                  <TableCell>{debt.lenderName}</TableCell>
                  <TableCell>${debt.debtAmount}</TableCell>
                  <TableCell>{debt.interestRate}%</TableCell>
                  <TableCell>${debt.amount}</TableCell>
                  <TableCell>
                    {format(debt.paymentStart, "dd-MM-yyyy")}
                  </TableCell>
                  <TableCell>${debt.installment}</TableCell>
                  <TableCell>
                    <DebtUpdateForm data={debt} />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigate(`/payment-plan/${debt.id}`);
                      }}
                    >
                      <FolderKanban className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <DebtDelete id={debt.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default DebtTable;
