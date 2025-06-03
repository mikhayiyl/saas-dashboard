import RevenueByCategoryChart from "@/components/dashboard/RevenueByCategoryChart";
import SalesTrendChart from "@/components/dashboard/SalesTrendChart";
import { UserGrowthChart } from "@/components/dashboard/UserGrowthChart";

export default function Dashboard() {
  return (
    <main className="p-6 space-y-6">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

      {/* Sales Trend Chart */}
      <SalesTrendChart />

      {/* User Growth Chart */}
      <UserGrowthChart />

      {/* Revenue by Category Chart */}
      <RevenueByCategoryChart />
    </main>
  );
}
