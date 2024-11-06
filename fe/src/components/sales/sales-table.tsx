"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const mockSales = [
  {
    id: "1",
    date: "2024-01-20",
    customer: "John Doe",
    total: 299.99,
    status: "Completed",
  },
  {
    id: "2",
    date: "2024-01-19",
    customer: "Jane Smith",
    total: 199.99,
    status: "Pending",
  },
];

export function SalesTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockSales.map((sale) => (
          <TableRow key={sale.id}>
            <TableCell>#{sale.id}</TableCell>
            <TableCell>{sale.date}</TableCell>
            <TableCell>{sale.customer}</TableCell>
            <TableCell>${sale.total.toFixed(2)}</TableCell>
            <TableCell>{sale.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
