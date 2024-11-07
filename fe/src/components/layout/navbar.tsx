"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Package, ShoppingCart } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/sales", label: "Sales" },
    { href: "/purchases", label: "Purchases" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href={"/"} className="flex-shrink-0 flex items-center">
              {/* <LayoutDashboard className="h-8 w-8 text-indigo-600" /> */}
              <img src="/f1-car.png" className="h-16 w-16" />
              <span className="ml-2 max-md:hidden text-xl font-bold text-gray-900">
                Sales Manager
              </span>
            </Link>
            <div className="ml-6 flex space-x-8">
              <Link
                href={"/sales"}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname.includes("/sales")
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Sales
              </Link>
              <Link
                href={"/purchases"}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  pathname.includes("/purchases")
                    ? "border-indigo-500 text-gray-900"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                <Package className="h-5 w-5 mr-2" />
                Purchases
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
