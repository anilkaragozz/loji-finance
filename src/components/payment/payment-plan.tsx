import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PaymentPlan = () => {
  const fakeData = [
    {
      id: "6668c676db37bd9dfa33bc9d",
      createdAt: "2024-06-11T21:49:42.699Z",
      updatedAt: "2024-06-11T21:49:42.699Z",
      isPaid: false,
      paymentDate: "2024-06-11T00:00:00.000Z",
      paymentAmount: 300,
      debtId: "6668c676db37bd9dfa33bc9c",
      userId: "6667a9f31acdf5df9693d492",
    },
    {
      id: "6668c676db37bd9dfa33bc9e",
      createdAt: "2024-06-11T21:49:42.699Z",
      updatedAt: "2024-06-11T21:49:42.699Z",
      isPaid: false,
      paymentDate: "2024-07-11T00:00:00.000Z",
      paymentAmount: 300,
      debtId: "6668c676db37bd9dfa33bc9c",
      userId: "6667a9f31acdf5df9693d492",
    },
    {
      id: "6668c676db37bd9dfa33bc9f",
      createdAt: "2024-06-11T21:49:42.699Z",
      updatedAt: "2024-06-11T21:49:42.699Z",
      isPaid: false,
      paymentDate: "2024-08-11T00:00:00.000Z",
      paymentAmount: 300,
      debtId: "6668c676db37bd9dfa33bc9c",
      userId: "6667a9f31acdf5df9693d492",
    },
    {
      id: "6668c676db37bd9dfa33bca0",
      createdAt: "2024-06-11T21:49:42.699Z",
      updatedAt: "2024-06-11T21:49:42.699Z",
      isPaid: false,
      paymentDate: "2024-09-11T00:00:00.000Z",
      paymentAmount: 300,
      debtId: "6668c676db37bd9dfa33bc9c",
      userId: "6667a9f31acdf5df9693d492",
    },
    {
      id: "6668c676db37bd9dfa33bca1",
      createdAt: "2024-06-11T21:49:42.699Z",
      updatedAt: "2024-06-11T21:49:42.699Z",
      isPaid: false,
      paymentDate: "2024-10-11T00:00:00.000Z",
      paymentAmount: 300,
      debtId: "6668c676db37bd9dfa33bc9c",
      userId: "6667a9f31acdf5df9693d492",
    },
    {
      id: "6668c676db37bd9dfa33bca2",
      createdAt: "2024-06-11T21:49:42.699Z",
      updatedAt: "2024-06-11T21:49:42.699Z",
      isPaid: false,
      paymentDate: "2024-11-11T00:00:00.000Z",
      paymentAmount: 300,
      debtId: "6668c676db37bd9dfa33bc9c",
      userId: "6667a9f31acdf5df9693d492",
    },
    {
      id: "6668c676db37bd9dfa33bca3",
      createdAt: "2024-06-11T21:49:42.699Z",
      updatedAt: "2024-06-11T21:49:42.699Z",
      isPaid: false,
      paymentDate: "2024-12-11T00:00:00.000Z",
      paymentAmount: 300,
      debtId: "6668c676db37bd9dfa33bc9c",
      userId: "6667a9f31acdf5df9693d492",
    },
  ];
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Payment Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Payment Date</TableHead>
              <TableHead>Payment Amount</TableHead>
              <TableHead>Is Paid</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fakeData.map((debt) => (
              <TableRow key={debt.id}>
                <TableCell>{debt.paymentDate}</TableCell>
                <TableCell>{debt.paymentAmount}</TableCell>
                <TableCell>{debt.isPaid ? "Yes" : "No"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PaymentPlan;
