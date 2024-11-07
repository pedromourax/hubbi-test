"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { getSales } from "./actions";
import { MultiSelect } from "@/components/ui/multi-select";

export default function NewPurchasePage() {
  // BUSCAR SOMENTE AS SALES QUE ESTÃO 'PENDENTES'
  const { data: sales, error } = useSWR("getSales", getSales);
  const [selectedSale, setSelectedSale] = useState<any>();
  const [selectedProducts, setSelectedProducts] = useState<string[]>();
  const [productsList, setProductsList] = useState();

  const formatProductsSelection = () => {
    console.log(sales[selectedSale]?.items);
    const a = sales[selectedSale]?.items.map((product: any) => {
      return {
        value: product.id,
        label: `${product.quantity}x ${product.product.name} - $${product.price}`,
        icon: Package2,
      };
    });
    setProductsList(a);
  };

  const onsubmit = () => {
    selectedSale;
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
      <div className="max-w-2xl min-w-80">
        <Card>
          <CardHeader>
            <CardTitle>New Purchase</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onsubmit} className="space-y-6">
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
                          <div>{`Sale ${sales[selectedSale]?.id}`}</div>
                        )}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {sales ? (
                          sales.map((sale: any, index: any) => (
                            <SelectItem key={sale.id} value={index}>
                              {`Sale id: ${sale.id} - $${sale.totalAmount}`}
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
                      />
                    </div>
                  )}

                  {/* {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex gap-2 mb-4 w-full items-center"
                    >
                      <Input
                        type="text"
                        placeholder="Product name"
                        className="p-2 border rounded-md w-[31%]"
                      />
                      <Input
                        type="number"
                        placeholder="Quantity"
                        min="1"
                        className="p-2 border rounded-md w-[31%]"
                      />
                      <Input
                        type="number"
                        placeholder="Price"
                        min="0"
                        step="0.01"
                        className="p-2 border rounded-md w-[31%]"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const prod = removeProduct(product.id);
                          setProducts(prod);
                        }}
                        className="w-[7%] rounded-full bg-red-50 hover:bg-red-100 cursor-pointer p-2 flex items-center justify-center"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))} */}
                  {/* <Button
                    type="button"
                    variant="outline"
                    onClick={addProduct}
                    className="mt-2 gap-2"
                  >
                    <Plus size={16} />
                    Add Product
                  </Button> */}
                </div>
              </div>

              <Button
                type="submit"
                variant="expandIcon"
                Icon={ShoppingCart}
                iconPlacement="right"
                iconSize={16}
                className="w-full"
              >
                Create Purchase
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
