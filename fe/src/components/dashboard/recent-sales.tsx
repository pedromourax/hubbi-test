import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "../ui/separator";

export function RecentSales() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="">
          {["Alice Johnson", "Bob Smith", "Carol Williams"].map((name, i) => (
            <div
              key={i}
              className="flex items-center hover:bg-neutral-50 rounded-xl py-4 px-2 cursor-default transition-all"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <span className="text-sm font-medium text-primary">
                  {name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              </div>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{name}</p>
                <p className="text-sm text-muted-foreground">
                  {`order_${(1000 + i).toString()}`}
                </p>
              </div>
              <div className="ml-auto font-medium">
                +${(Math.random() * 1000).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
