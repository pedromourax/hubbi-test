import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Store, ShoppingCart } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <Store className="h-6 w-6" />
              <span className="font-bold">Sales Management</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/sales">
                <Button variant="ghost">Sales</Button>
              </Link>
              <Link href="/purchases">
                <Button variant="ghost">Purchases</Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/sales/new">
              <Button>
                <Store className="mr-2 h-4 w-4" />
                New Sale
              </Button>
            </Link>
            <Link href="/purchases/new">
              <Button variant="outline">
                <ShoppingCart className="mr-2 h-4 w-4" />
                New Purchase
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
