import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PurchaseDetails } from "./_components/purchase-details";
import { getPurchase } from "./actions";

export default async function PurchasePage({
  params,
}: {
  params: { purchaseId: string };
}) {
  const id = params.purchaseId;
  let purchase;

  try {
    purchase = await getPurchase(id);
  } catch (error) {
    console.error("Error loading the purchase:", error);
    return <div>Error loading purchases. Please try again later.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="w-full flex items-center justify-start mb-3">
        <Link
          href={"/purchases"}
          className="w-fit flex items-center justify-center gap-1 text-neutral-500"
        >
          <ArrowLeft size={16} />
          Purchases
        </Link>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Purchase #{id}</CardTitle>
        </CardHeader>
        <CardContent>
          <PurchaseDetails
            products={purchase.products}
            totalAmount={purchase.totalAmount}
          />
        </CardContent>
      </Card>
    </div>
  );
}
