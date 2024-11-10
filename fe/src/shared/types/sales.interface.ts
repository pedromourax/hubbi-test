interface Product {
  id: number;
  name: string;
  price: string;
  quantity: number;
}

interface Purchase {
  id: number;
  totalAmount: string;
  products: Product[];
}

interface Sale {
  id: number;
  customerName: string;
  totalAmount: string;
  date: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
  products: Product[];
  purchases: Purchase[];
}

type Sales = Sale[];

export type { Sale, Product, Purchase, Sales };
