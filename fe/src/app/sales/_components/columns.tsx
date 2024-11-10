"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import {
  Ban,
  BookmarkCheck,
  CircleDashed,
  Clock,
  EllipsisVertical,
  PackageSearch,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { deleteSale, updateStatus } from "../actions";
import { toast } from "sonner";
import { formatCurrency } from "@/shared/functions";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "Sale ID",
    cell: ({ row }) => {
      return `#${row.getValue("id")}`;
    },
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
    cell: ({ row }) => {
      const name: string = row.getValue("customerName");
      return <p className="text-sm font-medium leading-none">{name}</p>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const totalAmountValue: number = row.getValue("totalAmount");
      return <div>{`${formatCurrency(totalAmountValue)}`}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: any = row.getValue("status");
      let badgeColor = "";

      switch (status) {
        case "PENDING":
          badgeColor = "bg-yellow-100";
          break;
        case "COMPLETED":
          badgeColor = "bg-green-100";
          break;
        case "CANCELLED":
          badgeColor = "bg-red-100";
          break;
        default:
          badgeColor = "bg-gray-100";
      }

      return (
        <span
          className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-semibold ${badgeColor}`}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "products",
    header: "Items",
    cell: ({ row }) => {
      const items: any = row.getValue("products");
      return <div> {items?.length} </div>;
    },
  },
  {
    accessorKey: "id",
    header: "Actions",
    cell: ({ row }) => {
      const id: any = row.getValue("id");
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link
                className="gap-1 flex items-center justify-start"
                href={`/sales/${id}`}
              >
                <PackageSearch size={14} />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <Clock size={14} />
                Status
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={async () => {
                    await updateStatus(id, "PENDING")
                      .then(() => {
                        toast.success("Status set to pending successfully");
                      })
                      .catch((e: any) => toast.error(e));
                  }}
                >
                  <CircleDashed size={14} />
                  <span>Pending</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={async () => {
                    await updateStatus(id, "CANCELLED")
                      .then(() => {
                        toast.success("Status set to cancelled successfully");
                      })
                      .catch((e: any) => toast.error(e));
                  }}
                >
                  <Ban size={14} />
                  <span>Cancelled</span>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={async () => {
                    await updateStatus(id, "COMPLETED")
                      .then(() => {
                        toast.success("Status set to completed successfully");
                      })
                      .catch((e: any) => toast.error(e));
                  }}
                >
                  <BookmarkCheck size={14} />
                  <span>Completed</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuLabel> Actions </DropdownMenuLabel>
            <DropdownMenuItem
              onClick={async () => {
                await deleteSale(id)
                  .then(() => {
                    toast.success("Deleted successfully");
                  })
                  .catch((e: any) => toast.error(e));
              }}
            >
              <Trash2 size={14} />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
