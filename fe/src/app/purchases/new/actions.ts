"use server";
import { IProduct } from "@/app/sales/new/actions";
import { API_URL } from "@/shared/config";
import { revalidateTag } from "next/cache";

export interface IPurchaseProduct {
  id: number;
}

export interface IPurchase {
  sale: number;
  products: IPurchaseProduct[];
}

export const getSales = async () => {
  const response = await fetch(`${API_URL}/api/v1/sales`, {
    method: "GET",
  });
  const result = await response.json();
  return result;
};

export const createPurchase = async (purchase: IPurchase) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/purchases`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchase),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erro na requisição:", {
        status: response.status,
        statusText: response.statusText,
        body: errorData,
        requestData: purchase,
      });
      throw new Error(`Erro na requisição: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    revalidateTag("get-purchases");
    return data;
  } catch (error) {
    console.error("Erro ao criar venda:", error);
    throw error;
  }
};
