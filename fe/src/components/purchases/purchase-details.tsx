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
  id: number;
  totalAmount: string;
  products: Product[];
}

interface PurchaseDetailsProps {
  id: string;
}

export function PurchaseDetails({ id }: PurchaseDetailsProps) {
  const purchase: Purchase = {
    id: parseInt(id),
    totalAmount: "15272.76",
    products: [
      {
        id: 21,
        name: "fgbhdfd",
        price: "34.43",
        quantity: 324,
      },
      {
        id: 20,
        name: "asd",
        price: "343.12",
        quantity: 12,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="grid gap-4">
        <PurchaseSummary totalAmount={purchase.totalAmount} />
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Purchase Items</h3>
          <ProductsTable products={purchase.products} />
        </CardContent>
      </Card>
    </div>
  );
}
