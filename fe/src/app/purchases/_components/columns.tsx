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
  ArrowDownUp,
  ArrowUpDown,
  ArrowUpRight,
  EllipsisVertical,
  Pencil,
  Trash2,
} from "lucide-react";
// import { toast } from "sonner";
import Link from "next/link";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "purchaseId",
    header: "Purchase ID",
  },
  {
    accessorKey: "relatedSale",
    header: "Related Sale",
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    // cell: ({ row }) => {
    //   const dateValue: { seconds: number; nanoseconds: number } =
    //     row.getValue("date");
    //   const formattedDate = dateValue
    //     ? new Date(dateValue.seconds * 1000).toLocaleDateString("pt-BR")
    //     : "Data inválida";
    //   return <div>{formattedDate}</div>;
    // },
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
    accessorKey: "amount",
    header: "Amount",
  },

  {
    accessorKey: "purchaseId",
    header: "Opções",
    cell: ({ row }) => {
      const post = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <EllipsisVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(post.id)}
            >
              <Link
                className="gap-1 flex items-center justify-start"
                href={`edit/${post.id}`}
              >
                <Pencil size={14} />
                Editar Post
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => {}}>
              <Link
                className="gap-1 flex items-center justify-start"
                href={`/posts/${post.slug}`}
              >
                <ArrowUpRight size={14} />
                Ir para página
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="flex items-center gap-2"
              onClick={() => {
                console.log("tes");
              }}
            >
              <Trash2 size={14} />
              Deletar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
