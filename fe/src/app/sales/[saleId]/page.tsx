import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Package, ShoppingCart, User } from "lucide-react";
import { getSale } from "./actions";
import { ProductsTable } from "./_components/productsTable";
import { columns } from "./_components/columns";
import Link from "next/link";
import { format } from "date-fns";
import { RelatedPurchasesTable } from "./_components/relatedPurchasesTable";
import { formatCurrency } from "@/shared/functions";

export default async function Page({ params }: { params: { saleId: string } }) {
  const saleId = params.saleId;

  const sale = await getSale(saleId);

  const getStatusColor = (status: string) => {
    const colors = {
      COMPLETED: "bg-green-100 text-green-800",
      PENDING: "bg-yellow-100 text-yellow-800",
      CANCELLED: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  if (!sale) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h1 className="text-2xl font-bold text-neutral-700">Sale not found</h1>
        <p className="text-neutral-500">
          The sale #{saleId} does not exist or has been removed
        </p>
        <Link
          href="/sales"
          className="flex items-center gap-2 text-primary hover:underline"
        >
          <ArrowLeft size={16} />
          Back to sales
        </Link>
      </div>
    );
  }

  if (sale) {
    return (
      <div className="space-y-6 px-24 max-lg:px-16 max-md:px-3">
        <Link
          href={"/sales"}
          className="w-fit flex items-center justify-center gap-1 text-neutral-500"
        >
          <ArrowLeft size={16} />
          Sales
        </Link>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Sale #{saleId}</h1>
          <Badge className={getStatusColor(sale.status)}>{sale.status}</Badge>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">
                Customer Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-xl font-bold text-primary">
                    {sale.customerName.split(" ") > 1
                      ? sale.customerName.map((n: string) => n[0]).join("")
                      : sale.customerName.slice(0, 2)}
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="text-2xl font-bold">{sale.customerName}</div>
                  <p className="text-sm text-muted-foreground">
                    Order Date:{" "}
                    {format(new Date(sale.date), "dd/MM/yyyy - HH:mm")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <Package className="mr-2 h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{sale.products?.length}</div>
              <p className="text-sm text-muted-foreground">
                Total Quantity:{" "}
                {sale.products?.reduce(
                  (acc: any, item: any) => acc + item.quantity,
                  0
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center space-y-0 pb-2">
              <ShoppingCart className="mr-2 h-4 w-4 text-muted-foreground" />
              <CardTitle className="text-sm font-medium">
                Total Amount
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(sale.totalAmount)}
              </div>
              {/* <p className="text-sm text-muted-foreground">
                {sale.relatedPurchases.length} Related Purchases
              </p> */}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductsTable columns={columns} data={sale?.products} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Related Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <RelatedPurchasesTable purchases={sale.purchases} />
          </CardContent>
        </Card>
      </div>
    );
  }
}
