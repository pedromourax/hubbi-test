import { API_URL } from "@/shared/config";
import { IDashboard } from "@/shared/types/dashboard.interface";

export const getDashboard = async (): Promise<IDashboard> => {
  const response = await fetch(`${API_URL}/api/v1/sales/last`, {
    method: "GET",
    cache: "no-cache",
  });
  return await response.json();
};
