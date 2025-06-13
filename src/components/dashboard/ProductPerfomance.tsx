import UseLiveProducts from "@/hooks/UseLiveProducts";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function ProductPerformanceChart() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">(
    "weekly"
  );

  const { data, isUpdating, error, retry } = UseLiveProducts();

  const filteredData = data.map((item) => {
    let multiplier = 1;
    if (period === "daily") multiplier = 1 / 7;
    if (period === "monthly") multiplier = 4;

    return {
      ...item,
      score: Math.round(item.score * multiplier),
      rating: item.rating,
    };
  });

  const handleExportCSV = () => {
    const csvHeader = "Product,Score,Rating\n";
    const csvRows = filteredData
      .map((item) => `${item.name},${item.score},${item.rating.toFixed(1)}`)
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "product_performance.csv");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Product Performance (
          {period.charAt(0).toUpperCase() + period.slice(1)})
        </h2>
        <div className="flex items-center gap-3">
          <select
            value={period}
            onChange={(e) =>
              setPeriod(e.target.value as "daily" | "weekly" | "monthly")
            }
            className="text-xs bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-100 px-2 py-1 rounded"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          {isUpdating && (
            <span
              className="text-sm text-amber-500 animate-pulse"
              aria-live="polite"
            >
              Updating…
            </span>
          )}

          <button
            onClick={handleExportCSV}
            className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800"
          >
            Export CSV
          </button>
        </div>
      </div>

      {error && (
        <div
          className="text-sm text-red-500 dark:text-red-400 mb-4"
          role="alert"
        >
          <p>⚠️ Error: {error.message}</p>
          <button
            onClick={retry}
            className="ml-2 px-2 py-1 text-xs bg-red-200 text-red-600 rounded hover:bg-red-300 transition dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
          >
            Retry
          </button>
        </div>
      )}

      {data.length === 0 && !error ? (
        <div className="h-[300px] w-full flex flex-col justify-between px-4 py-6 animate-pulse">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="h-[2px] bg-gray-300 dark:bg-zinc-700 rounded w-full"
              style={{ width: `${80 + Math.random() * 20}%` }}
            />
          ))}
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 5]}
              tick={{ fill: "#facc15" }}
              stroke="#facc15"
            />
            <Tooltip
              formatter={(value, name) => {
                if (name === "Rating")
                  return [(value as number).toFixed(1), "Rating"];
                return [value, "Performance Score"];
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "0.75rem" }}
              formatter={(value: string) => {
                if (value === "score") return "Performance Score";
                if (value === "rating") return "Rating";
                return value;
              }}
            />

            <Bar
              yAxisId="left"
              dataKey="score"
              fill="#6366f1"
              radius={[8, 8, 0, 0]}
              maxBarSize={40}
              name="score"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="rating"
              stroke="#facc15"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              name="rating"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </motion.section>
  );
}
