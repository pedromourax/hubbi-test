"use server";
import { API_URL } from "@/shared/config";
import { revalidateTag } from "next/cache";

export const getSales = async () => {
  try {
    const response = await fetch(`${API_URL}/api/v1/sales`, {
      method: "GET",
      cache: "no-cache",
      next: {
        tags: ["get-sales"],
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Erro ao buscar vendas:", error);
    return null;
  }
};

export const updateStatus = async (
  id: string,
  status: "PENDING" | "COMPLETED" | "CANCELLED"
) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/sales/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Erro na requisição:", {
        status: response.status,
        statusText: response.statusText,
        body: errorData,
        requestData: status,
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

export const deleteSale = async (id: string) => {
  const response = await fetch(`${API_URL}/api/v1/sales/${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });
  revalidateTag("get-sales");
  return await response.json();
};
