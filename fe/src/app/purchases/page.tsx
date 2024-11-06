import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import Link from "next/link";
import { PurchasesTable } from "./_components/purchasesTable";
import { columns } from "./_components/columns";

export default function PurchasesPage() {
  const purchaseData = [
    {
      purchaseId: "PUR-1001",
      relatedSale: "ORD-1001",
      date: "06/11/2024",
      status: "Pending",
      amount: "$405.59",
    },
    {
      purchaseId: "PUR-1002",
      relatedSale: "ORD-1002",
      date: "06/11/2024",
      status: "Pending",
      amount: "$671.35",
    },
    {
      purchaseId: "PUR-1003",
      relatedSale: "ORD-1003",
      date: "06/11/2024",
      status: "Pending",
      amount: "$783.51",
    },
    {
      purchaseId: "PUR-1004",
      relatedSale: "ORD-1004",
      date: "07/11/2024",
      status: "Completed",
      amount: "$254.21",
    },
    {
      purchaseId: "PUR-1005",
      relatedSale: "ORD-1005",
      date: "07/11/2024",
      status: "Pending",
      amount: "$932.67",
    },
    {
      purchaseId: "PUR-1006",
      relatedSale: "ORD-1006",
      date: "08/11/2024",
      status: "Completed",
      amount: "$420.75",
    },
    {
      purchaseId: "PUR-1007",
      relatedSale: "ORD-1007",
      date: "08/11/2024",
      status: "Cancelled",
      amount: "$315.60",
    },
    {
      purchaseId: "PUR-1008",
      relatedSale: "ORD-1008",
      date: "09/11/2024",
      status: "Pending",
      amount: "$178.40",
    },
    {
      purchaseId: "PUR-1009",
      relatedSale: "ORD-1009",
      date: "10/11/2024",
      status: "Completed",
      amount: "$560.00",
    },
    {
      purchaseId: "PUR-1010",
      relatedSale: "ORD-1010",
      date: "10/11/2024",
      status: "Pending",
      amount: "$899.99",
    },
    {
      purchaseId: "PUR-1011",
      relatedSale: "ORD-1011",
      date: "11/11/2024",
      status: "Completed",
      amount: "$100.45",
    },
    {
      purchaseId: "PUR-1012",
      relatedSale: "ORD-1012",
      date: "12/11/2024",
      status: "Pending",
      amount: "$675.50",
    },
    {
      purchaseId: "PUR-1013",
      relatedSale: "ORD-1013",
      date: "13/11/2024",
      status: "Cancelled",
      amount: "$489.65",
    },
    {
      purchaseId: "PUR-1014",
      relatedSale: "ORD-1014",
      date: "13/11/2024",
      status: "Completed",
      amount: "$210.30",
    },
    {
      purchaseId: "PUR-1015",
      relatedSale: "ORD-1015",
      date: "14/11/2024",
      status: "Pending",
      amount: "$354.80",
    },
    {
      purchaseId: "PUR-1016",
      relatedSale: "ORD-1016",
      date: "15/11/2024",
      status: "Pending",
      amount: "$602.00",
    },
    {
      purchaseId: "PUR-1017",
      relatedSale: "ORD-1017",
      date: "15/11/2024",
      status: "Completed",
      amount: "$299.99",
    },
    {
      purchaseId: "PUR-1018",
      relatedSale: "ORD-1018",
      date: "16/11/2024",
      status: "Cancelled",
      amount: "$450.25",
    },
    {
      purchaseId: "PUR-1019",
      relatedSale: "ORD-1019",
      date: "17/11/2024",
      status: "Completed",
      amount: "$320.75",
    },
    {
      purchaseId: "PUR-1020",
      relatedSale: "ORD-1020",
      date: "18/11/2024",
      status: "Pending",
      amount: "$150.99",
    },
  ];

  return (
    <div className="space-y-6 px-24 max-lg:px-16 max-md:px-3">
      <div className="flex items-center justify-between">
        {/* <h1 className="text-3xl font-bold">Purchases</h1> */}
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Purchases
        </h1>
        <Link
          href="/purchases/new"
          className="flex items-center justify-center"
        >
          <Button
            variant={"expandIcon"}
            iconPlacement="right"
            Icon={Plus}
            iconSize={16}
          >
            {/* <Plus className="mr-2 h-4 w-4" /> */}
            New Purchase
          </Button>
        </Link>
      </div>
      <PurchasesTable columns={columns} data={purchaseData} />
    </div>
  );
}
