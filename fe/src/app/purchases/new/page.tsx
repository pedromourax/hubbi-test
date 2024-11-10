"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Package2, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { createPurchase, getSales, IPurchase } from "./actions";
import { MultiSelect } from "@/components/ui/multi-select";
import { toast } from "sonner";

export const dynamic = "force-dynamic";

export default function NewPurchasePage() {
  const { data: sales, error } = useSWR("getSales", getSales);
  const [selectedSale, setSelectedSale] = useState<any>();
  const [selectedProducts, setSelectedProducts] = useState<string[]>();
  const [productsList, setProductsList] = useState();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formatProductsSelection = () => {
    const sale = sales[selectedSale];

    const purchasedProductIds = new Set(
      (sale?.purchases || []).reduce((acc: number[], purchase: any) => {
        if (purchase?.products && Array.isArray(purchase.products)) {
          return [
            ...acc,
            ...purchase.products.map((product: any) => product.id),
          ];
        }
        return acc;
      }, [])
    );
    const availableProducts = sale?.products
      .filter((product: any) => !purchasedProductIds.has(product.id))
      .map((product: any) => {
        return {
          value: product.id,
          label: `${product.quantity}x ${product.name} - $${product.price}`,
          icon: Package2,
        };
      });

    setProductsList(availableProducts);
  };

  const onsubmit = async () => {
    setIsLoading(true);
    try {
      const saleId = sales[selectedSale]?.id;

      if (!saleId || !selectedSale || !selectedProducts)
        throw new Error("Please fill in the data correctly");

      const purchase: IPurchase = {
        sale: saleId,
        products: selectedProducts.map((id: string) => {
          return { id: +id };
        }),
      };

      await createPurchase(purchase);
      setIsLoading(false);
      toast.success("Purchase created successfully");
      setSelectedSale(undefined);
      setSelectedProducts(undefined);
      setProductsList(undefined);
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="px-24 w-full flex items-center justify-center flex-col max-lg:px-16 max-md:px-3">
      <div className="w-full flex items-center justify-start max-md:mb-3">
        <Link
          href={"/purchases"}
          className="w-fit flex items-center justify-center gap-1 text-neutral-500"
        >
          <ArrowLeft size={16} />
          Purchases
        </Link>
      </div>
      <div className="w-80">
        <Card>
          <CardHeader>
            <CardTitle>New Purchase</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onsubmit();
              }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium mb-2">
                    <Label className="block text-sm font-medium mb-2">
                      Choose a Sale
                    </Label>
                  </Label>

                  <Select
                    onValueChange={(value) => {
                      formatProductsSelection();
                      return setSelectedSale(value);
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sales">
                        {selectedSale && (
                          <div>{`#${sales[selectedSale]?.id} - ${sales[selectedSale]?.customerName} $${sales[selectedSale]?.totalAmount}`}</div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {sales ? (
                          sales.map((sale: any, index: any) => (
                            <SelectItem key={sale.id} value={index}>
                              {`#${sale.id} - ${sale.customerName} $${sale.totalAmount}`}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value={"none"}>Loading...</SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  {productsList && (
                    <div>
                      <Label className="block text-sm font-medium mb-2">
                        Products
                      </Label>

                      <MultiSelect
                        options={productsList}
                        onValueChange={setSelectedProducts}
                        placeholder="Select Products"
                        variant="inverted"
                        animation={2}
                        maxCount={3}
                        className="text-wrap"
                      />
                    </div>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                variant="expandIcon"
                Icon={ShoppingCart}
                iconPlacement="right"
                iconSize={16}
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-800" />
                ) : (
                  "Create Purchase"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
