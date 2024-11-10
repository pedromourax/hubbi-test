"use server";

import { API_URL } from "@/shared/config";

export const getPurchase = async (id: string) => {
  const response = await fetch(`${API_URL}/purchases/${id}`, {
    method: "GET",
    next: {
      tags: ["get-purchase"],
    },
  });
  const result = await response.json();
  return result;
};
