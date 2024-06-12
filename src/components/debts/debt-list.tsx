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
import DebptUpdateForm from "@/components/debts/debt-update";
import DebptCreateForm from "@/components/debts/debt-create";

const debtData = [
  {
    id: "6668c676db37bd9dfa33bc9c",
    createdAt: "2024-06-11T21:49:42.699Z",
    updatedAt: "2024-06-11T21:49:42.699Z",
    isActive: true,
    debtName: "Student Loan",
    lenderName: "ABC Bank",
    debtAmount: 20000,
    interestRate: 5.5,
    amount: 21000,
    paymentStart: "2024-06-11T00:00:00.000Z",
    installment: 300,
    description: "This is a loan taken for undergraduate studies.",
    userId: "6667a9f31acdf5df9693d492",
  },
  {
    id: "7778c676db37bd9dfa33bc9d",
    createdAt: "2024-05-10T15:20:30.699Z",
    updatedAt: "2024-05-10T15:20:30.699Z",
    isActive: true,
    debtName: "Car Loan",
    lenderName: "XYZ Financial",
    debtAmount: 15000,
    interestRate: 4.2,
    amount: 15500,
    paymentStart: "2024-05-10T00:00:00.000Z",
    installment: 350,
    description: "This is a loan taken for a new car.",
    userId: "7777a9f31acdf5df9693d493",
  },
  {
    id: "8888c676db37bd9dfa33bc9e",
    createdAt: "2024-04-05T10:10:10.699Z",
    updatedAt: "2024-04-05T10:10:10.699Z",
    isActive: true,
    debtName: "Mortgage",
    lenderName: "LMN Bank",
    debtAmount: 300000,
    interestRate: 3.9,
    amount: 305000,
    paymentStart: "2024-04-05T00:00:00.000Z",
    installment: 1500,
    description: "This is a mortgage for a new house.",
    userId: "8888a9f31acdf5df9693d494",
  },
  {
    id: "9998c676db37bd9dfa33bc9f",
    createdAt: "2024-03-01T08:08:08.699Z",
    updatedAt: "2024-03-01T08:08:08.699Z",
    isActive: true,
    debtName: "Credit Card Debt",
    lenderName: "PQR Bank",
    debtAmount: 5000,
    interestRate: 19.99,
    amount: 5200,
    paymentStart: "2024-03-01T00:00:00.000Z",
    installment: 200,
    description: "This is a credit card debt.",
    userId: "9999a9f31acdf5df9693d495",
  },
  {
    id: "1010c676db37bd9dfa33bc9g",
    createdAt: "2024-02-20T12:12:12.699Z",
    updatedAt: "2024-02-20T12:12:12.699Z",
    isActive: false,
    debtName: "Personal Loan",
    lenderName: "STU Bank",
    debtAmount: 10000,
    interestRate: 7.5,
    amount: 10250,
    paymentStart: "2024-02-20T00:00:00.000Z",
    installment: 250,
    description: "This is a personal loan for home renovation.",
    userId: "1010a9f31acdf5df9693d496",
  },
];

const DebtTable = () => {
  return (
    <>
      <Card x-chunk="dashboard-01-chunk-4">
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Debts</CardTitle>
          </div>
          <div className="ml-auto gap-1">
            <DebptCreateForm />
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
              {debtData.map((debt) => (
                <TableRow key={debt.id}>
                  <TableCell>{debt.debtName}</TableCell>
                  <TableCell>{debt.description}</TableCell>
                  <TableCell>{format(debt.createdAt, "dd-MM-yyyy")}</TableCell>
                  <TableCell>{format(debt.updatedAt, "dd-MM-yyyy")}</TableCell>
                  <TableCell>{debt.isActive ? "Active" : "Inactive"}</TableCell>
                  <TableCell>{debt.lenderName}</TableCell>
                  <TableCell>${debt.debtAmount.toFixed(2)}</TableCell>
                  <TableCell>{debt.interestRate}%</TableCell>
                  <TableCell>${debt.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    {format(debt.paymentStart, "dd-MM-yyyy")}
                  </TableCell>
                  <TableCell>${debt.installment.toFixed(2)}</TableCell>
                  <TableCell>
                    <DebptUpdateForm />
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
