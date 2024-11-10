"use server";

import { API_URL } from "@/shared/config";

export const getSale = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/api/v1/sales/${id}`, {
      cache: "no-cache",
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
