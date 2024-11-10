"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentSales } from "@/components/dashboard/recent-sales";
import { formatCurrency } from "@/shared/functions";
import { ChartNoAxesCombined, Package, ShoppingCart } from "lucide-react";
import useSWR from "swr";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getDashboard } from "./actions";

export default function Home() {
  const {
    data: dashboard,
    error,
    isLoading,
  } = useSWR("/api/dashboard", getDashboard);

  if (error) {
    return (
      <Alert variant="destructive" className="mx-24 max-md:mx-3">
        <AlertDescription>Error loading data: {error.message}</AlertDescription>
      </Alert>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-8 px-24 max-lg:px-16 max-md:px-3">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded animate-pulse" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-24 max-lg:px-16 max-md:px-3">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row items-center">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {dashboard ? formatCurrency(dashboard.sales) : "No sales found"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row items-center">
              <Package className="mr-2 h-5 w-5" />
              Total Purchases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {dashboard
                ? formatCurrency(dashboard.purchases)
                : "No purchases found"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-row items-center">
              <ChartNoAxesCombined className="mr-2 h-5 w-5" />
              Profit Margin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {dashboard && dashboard.purchases > 0
                ? `${(
                    (dashboard.sales / dashboard.purchases) * 100 -
                    100
                  ).toFixed(2)}%`
                : "N/A"}
            </p>
          </CardContent>
        </Card>
      </div>
      {dashboard ? (
        <RecentSales sales={dashboard.lastThree} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent>No recent sales</CardContent>
        </Card>
      )}
    </div>
  );
}
