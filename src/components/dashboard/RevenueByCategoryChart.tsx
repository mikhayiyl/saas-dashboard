import UseLiveRevenue from "@/hooks/UseLiveRevenue";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function RevenueByCategoryChart() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">(
    "weekly"
  );

  const { data, isUpdating, error, retry } = UseLiveRevenue();

  const filteredData = data.map((item) => {
    let modifier = 1;
    if (period === "daily") modifier = 1 / 7;
    if (period === "monthly") modifier = 4;
    return {
      ...item,
      revenue: Math.round(item.revenue * modifier),
    };
  });

  const handleExportCSV = () => {
    const csvHeader = "Category,Revenue\n";
    const csvRows = filteredData
      .map((item) => `${item.category},${item.revenue}`)
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "revenue_by_category.csv");
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
          Revenue by Category (
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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--foreground)",
                color: "var(--background)",
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
            <Bar
              dataKey="revenue"
              fill="#3b82f6"
              animationDuration={500}
              isAnimationActive
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </motion.section>
  );
}
