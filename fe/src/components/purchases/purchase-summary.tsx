"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface PurchaseSummaryProps {
  totalAmount: string;
}

export function PurchaseSummary({ totalAmount }: PurchaseSummaryProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm font-medium text-muted-foreground">
            Total Amount
          </p>
        </div>
        <p className="mt-2 text-2xl font-bold">
          ${parseFloat(totalAmount).toFixed(2)}
        </p>
      </CardContent>
    </Card>
  );
}
