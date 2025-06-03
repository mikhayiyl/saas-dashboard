import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const revenueData = [
  { category: "Electronics", revenue: 24000 },
  { category: "Clothing", revenue: 18000 },
  { category: "Home", revenue: 12000 },
  { category: "Books", revenue: 8000 },
];

export function RevenueByCategoryChart() {
  return (
    <section className="bg-white rounded-xl p-4 shadow-md">
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Revenue by Category
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
}
