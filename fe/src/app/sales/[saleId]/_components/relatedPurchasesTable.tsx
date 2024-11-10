import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/shared/functions";
import { format } from "date-fns";
import { Container, PackageOpen } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface Purchase {
  id: number;
  totalAmount: number;
  products: Product[];
}

interface RelatedPurchasesTableProps {
  purchases: Purchase[];
}

export function RelatedPurchasesTable({
  purchases,
}: RelatedPurchasesTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Purchase</TableHead>
            <TableHead>Products</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.length > 0 ? (
            purchases.map((purchase) => (
              <TableRow key={purchase.id}>
                <TableCell>#{purchase.id}</TableCell>
                <TableCell>
                  {purchase.products.map((product) => (
                    <div key={product.id} className="text-sm">
                      {product.name} ({product.quantity}x)
                    </div>
                  ))}
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(purchase.totalAmount)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="h-24 text-center text-muted-foreground"
              >
                <div className="flex items-center gap-2 justify-center">
                  No purchases available. <Container size={14} />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
