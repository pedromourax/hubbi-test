"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { PurchasesTable } from "./_components/purchasesTable";
import { columns } from "./_components/columns";
import useSWR from "swr";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import { getPurchases } from "./actions";

export default function PurchasesPage() {
  const {
    data: purchaseData,
    error,
    isLoading,
  } = useSWR("/api/purchases", getPurchases);

  if (error) {
    return (
      <Alert
        variant="destructive"
        className="mx-24 max-lg:mx-16 max-md:mx-3 mt-6"
      >
        <AlertDescription>
          Error loading purchases: {error.message}
        </AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 px-24 max-lg:px-16 max-md:px-3">
      <div className="flex items-center justify-between">
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
            New Purchase
          </Button>
        </Link>
      </div>
      <PurchasesTable columns={columns} data={purchaseData} />
    </div>
  );
}
