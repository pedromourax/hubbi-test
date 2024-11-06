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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function NewPurchasePage() {
  const [products, setProducts] = useState([
    { id: 1, name: "", quantity: 1, price: 0 },
  ]);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        id: products.length + 1,
        name: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const removeProduct = (id: number) => {
    return products.filter((product) => product.id !== id);
  };

  return (
    <div className="px-24 max-lg:px-16 max-md:px-3">
      <Link
        href={"/purchases"}
        className="absolute flex items-center gap-1 text-neutral-500"
      >
        <ArrowLeft size={16} />
        Purchases
      </Link>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>New Purchase</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium mb-2">
                    <Label className="block text-sm font-medium mb-2">
                      Choose a Sale
                    </Label>
                  </Label>
                  {/* <Input
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter customer name"
                  /> */}
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sales" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="apple">Apple</SelectItem>
                        <SelectItem value="banana">Banana</SelectItem>
                        <SelectItem value="blueberry">Blueberry</SelectItem>
                        <SelectItem value="grapes">Grapes</SelectItem>
                        <SelectItem value="pineapple">Pineapple</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="block text-sm font-medium mb-2">
                    Products
                  </Label>
                  {products.map((product) => (
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
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addProduct}
                    className="mt-2 gap-2"
                  >
                    <Plus size={16} />
                    Add Product
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                variant="ringHover"
                className="w-full gap-1"
              >
                Create Sale
                <ShoppingCart size={16} />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
