import ActiveUsersChart from "@/components/dashboard/ActiveUsers";
import ProductPerformanceChart from "@/components/dashboard/ProductPerfomance";
import RevenueByCategoryChart from "@/components/dashboard/RevenueByCategoryChart";
import SalesTrendChart from "@/components/dashboard/SalesTrendChart";
import UserGrowthChart from "@/components/dashboard/UserGrowthChart";

export default function Dashboard() {
  return (
    <main className="p-6 space-y-6 ">
      {/* Page title */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sales Trend Chart */}
        <SalesTrendChart />

        {/* User Growth Chart */}
        <UserGrowthChart />

        {/* Revenue by Category Chart */}
        <RevenueByCategoryChart />
        <ActiveUsersChart />
        <ProductPerformanceChart />
      </div>
    </main>
  );
}
