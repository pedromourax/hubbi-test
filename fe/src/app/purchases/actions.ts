"use server";

import { API_URL } from "@/shared/config";
import { revalidateTag } from "next/cache";

export const getPurchases = async () => {
  const response = await fetch(`${API_URL}/api/v1/purchases`, {
    method: "GET",
    next: {
      tags: ["get-purchases"],
    },
  });
  const result = await response.json();
  return result;
};

export const deletePurchase = async (id: string) => {
  const response = await fetch(`${API_URL}/api/v1/purchases/${id}`, {
    method: "DELETE",
    cache: "no-cache",
  });
  revalidateTag("get-purchases");
  return await response.json();
};
