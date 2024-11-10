"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpRight,
  EllipsisVertical,
  Package2,
  Pencil,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { deletePurchase } from "../actions";
import { toast } from "sonner";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      return `#${row.getValue("id")}`;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatCurrency = (value: number) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
      };
      return <div>{`${formatCurrency(amount)}`}</div>;
    },
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({ row }) => {
      const products: any[] = row.getValue("products");
      return (
        <div className="text-sm flex items-center gap-1">
          <Package2 size={14} /> {products.length}{" "}
          {products.length === 1 ? "item" : "items"}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Opções",
    cell: ({ row }) => {
      const purchase = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {}}>
              <Link
                className="gap-1 flex items-center justify-start"
                href={`/purchases/${purchase.id}`}
              >
                <ArrowUpRight size={14} />
                View details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={async () => {
                await deletePurchase(purchase.id)
                  .then(() => toast.success("Deleted successfully"))
                  .catch((e: any) => toast.error(e));
              }}
            >
              <Trash2 size={14} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
