"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createSale } from "./actions";
import { toast } from "sonner";

interface Product {
  name: string;
  quantity: number;
  price: number;
}

export default function NewSalePage() {
  const [customerName, setCustomerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([
    { name: "", quantity: 1, price: 0 },
  ]);

  const handleProductChange = (
    index: number,
    field: keyof Product,
    value: string | number
  ) => {
    setProducts(
      products.map((product, i) =>
        i === index ? { ...product, [field]: value } : product
      )
    );
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        name: "",
        quantity: 1,
        price: 0,
      },
    ]);
  };

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const sale = {
        customerName,
        products,
        date: new Date().toISOString(),
        status: "PENDING",
      };
      await createSale(sale)
        .then(() => {
          toast.success("Sale created successfully!");
        })
        .catch((error: any) => {
          throw new Error(error.message);
        });
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
      return toast.error("An error occurred while creating the sale.");
    }
  };

  return (
    <div className="px-24 max-lg:px-16 max-md:px-3">
      <div className="flex w-full items-center mb-3">
        <Link
          href={"/sales"}
          className="flex items-center gap-1 text-neutral-500"
        >
          <ArrowLeft size={16} />
          Sales
        </Link>
      </div>
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>New Sale</CardTitle>
          </CardHeader>
          <CardContent>
            <form
              className="space-y-6"
              onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="space-y-4">
                <div>
                  <Label className="block text-sm font-medium mb-2">
                    Customer Name
                  </Label>
                  <Input
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCustomerName(e.target.value)
                    }
                    className="w-full p-2 border rounded-md"
                    placeholder="Enter customer name"
                    required
                  />
                </div>

                <div>
                  <Label className="block text-sm font-medium mb-2">
                    Products
                  </Label>
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="flex gap-2 mb-4 w-full items-center"
                    >
                      <Input
                        type="text"
                        value={product.name}
                        onChange={(e) =>
                          handleProductChange(index, "name", e.target.value)
                        }
                        placeholder="Product name"
                        className="p-2 border rounded-md w-[31%]"
                        required
                      />
                      <Input
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                        placeholder="Quantity"
                        min="1"
                        className="p-2 border rounded-md w-[31%]"
                        required
                      />
                      <Input
                        type="number"
                        value={product.price}
                        onChange={(e) =>
                          handleProductChange(
                            index,
                            "price",
                            Number(e.target.value)
                          )
                        }
                        placeholder="Price"
                        min="0"
                        step="0.01"
                        className="p-2 border rounded-md w-[31%]"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => removeProduct(index)}
                        className="w-[7%] rounded-full bg-red-50 hover:bg-red-100 cursor-pointer p-2 flex items-center justify-center"
                        disabled={products.length === 1}
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

              <div className="text-right text-lg font-semibold mb-4">
                Total: $ {calculateTotal().toFixed(2)}
              </div>

              <Button
                type="submit"
                variant="expandIcon"
                Icon={ShoppingCart}
                iconSize={16}
                iconPlacement="right"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-800" />
                ) : (
                  "Create Sale"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
