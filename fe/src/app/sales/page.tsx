import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SalesTable } from "./_components/salesTable";
import { columns } from "./_components/columns";
import { getSales } from "./actions";

export default async function SalesPage() {
  const sales = await getSales();

  return (
    <div className="space-y-6 px-24 max-lg:px-16 max-md:px-3">
      <div className="flex justify-between items-center">
        {/* <h1 className="text-3xl font-bold">Sales</h1> */}

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
      <SalesTable columns={columns} data={sales} />
    </div>
  );
}
