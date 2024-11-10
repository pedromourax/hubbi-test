import { Sales } from "./sales.interface";

export interface IDashboard {
  sales: number;
  purchases: number;
  lastThree: Sales;
}
