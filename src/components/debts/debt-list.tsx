import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import DebtUpdateForm, { DebtData } from "@/components/debts/debt-update";
import DebtCreateForm from "@/components/debts/debt-create";
import { useGetDebts } from "@/services/queries";
import { OrbitProgress } from "react-loading-indicators";

const DebtTable = () => {
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
      <Card x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Debts</CardTitle>
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
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Status</TableHead>
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
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((debt: DebtData) => (
                <TableRow key={debt.id}>
                  <TableCell>{debt.debtName}</TableCell>
                  <TableCell>{debt.description}</TableCell>
                  <TableCell>{format(debt.createdAt, "dd-MM-yyyy")}</TableCell>
                  <TableCell>{format(debt.updatedAt, "dd-MM-yyyy")}</TableCell>
                  <TableCell>{debt.isActive ? "Active" : "Inactive"}</TableCell>
                  <TableCell>{debt.lenderName}</TableCell>
                  <TableCell>${debt.debtAmount}</TableCell>
                  <TableCell>{debt.interestRate}%</TableCell>
                  <TableCell>${debt.amount}</TableCell>
                  <TableCell>
                    {format(debt.paymentStart, "dd-MM-yyyy")}
                  </TableCell>
                  <TableCell>${debt.installment}</TableCell>
                  <TableCell>
                    <DebtUpdateForm />
                  </TableCell>
                  <TableCell>
                    <Eye className="h-4 w-4" />
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
