import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentSales } from "@/components/dashboard/recent-sales";

export default function Home() {
  return (
    <div className="space-y-8 px-24 max-lg:px-16 max-md:px-3">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$12,345</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Purchases</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$10,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">17.1%</p>
          </CardContent>
        </Card>
      </div>
      <RecentSales />
    </div>
  );
}
