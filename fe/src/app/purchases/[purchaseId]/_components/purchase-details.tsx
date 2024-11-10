"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PurchaseSummary } from "./purchase-summary";
import { ProductsTable } from "./purchase-table";

interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface Purchase {
  totalAmount: string;
  products: Product[];
}

export function PurchaseDetails({ totalAmount, products }: Purchase) {
  return (
    <div className="space-y-8">
      <div className="grid gap-4">
        <PurchaseSummary totalAmount={totalAmount} />
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Purchase Items</h3>
          <ProductsTable products={products} />
        </CardContent>
      </Card>
    </div>
  );
}
