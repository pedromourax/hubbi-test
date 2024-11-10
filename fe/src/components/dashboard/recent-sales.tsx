"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/shared/functions";
import { Sale, Sales } from "@/shared/types/sales.interface";

interface RecentSalesProps {
  sales: Sales;
}

export function RecentSales({ sales }: RecentSalesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          {sales ? (
            sales.map((sale: Sale, i) => (
              <div
                key={i}
                className="flex items-center hover:bg-neutral-50 rounded-xl py-4 px-2 cursor-default transition-all"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-sm font-medium text-primary">
                    {sale.customerName.split(" ").length > 1
                      ? sale.customerName
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")
                      : sale.customerName.slice(0, 2)}
                  </span>
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {sale.customerName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sale #{sale.id}
                  </p>
                </div>
                <div className="ml-auto font-medium">
                  +{formatCurrency(+sale.totalAmount)}
                </div>
              </div>
            ))
          ) : (
            <div className="h-24 w-full flex items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No recent sales found.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
