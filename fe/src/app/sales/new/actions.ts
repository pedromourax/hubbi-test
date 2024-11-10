"use server";
import { API_URL } from "@/shared/config";
import { revalidateTag } from "next/cache";

export type ISale = {
  customerName: string;
  status: string;
  products: IProduct[];
  date: string;
};

export interface IProduct {
  id?: number;
  name: string;
  price: number;
  quantity: number;
}

export const createSale = async (product: ISale) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/sales`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erro na requisição:", {
        status: response.status,
        statusText: response.statusText,
        body: errorData,
        requestData: product,
      });
      throw new Error(`Erro na requisição: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    revalidateTag("get-sales");
    return data;
  } catch (error) {
    console.error("Erro ao criar venda:", error);
    throw error;
  }
};
