import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4000 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 7000 },
];

const summaryStats = [
  { label: "Total Users", value: 1240 },
  { label: "Total Sales", value: "$58,000" },
  { label: "Active Sessions", value: 98 },
];

export default function Dashboard() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome back, Admin!</h1>

      {/* Summary Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {summaryStats.map(({ label, value }) => (
          <div
            key={label}
            className="p-4 bg-primary text-primary-foreground rounded-lg shadow"
          >
            <h2 className="text-sm font-medium">{label}</h2>
            <p className="text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </section>

      {/* Sales Trend Chart */}
      <section className="bg-white rounded-lg p-4 shadow">
        <h2 className="mb-4 font-semibold text-lg">Sales Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6" /* Tailwind blue-500 */
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
}
