import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PackageOpen, Plus } from "lucide-react";
import { SalesTable } from "./_components/salesTable";
import { columns } from "./_components/columns";
import { getSales } from "./actions";

export default async function SalesPage() {
  const sales = await getSales();
  return (
    <div className="space-y-6 px-24 max-lg:px-16 max-md:px-3">
      <div className="flex justify-between items-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Sales
        </h1>

        <Link href="/sales/new">
          <Button
            variant={"expandIcon"}
            iconPlacement="right"
            Icon={Plus}
            iconSize={16}
          >
            New Sale
          </Button>
        </Link>
      </div>
      {sales ? (
        <SalesTable columns={columns} data={sales} />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
          <h1 className="text-2xl font-bold text-neutral-700">
            No sales found
          </h1>
          <p className="text-neutral-500 flex gap-2">
            No sales found <PackageOpen />
          </p>
          <Link
            href="/"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
