import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { saveAs } from "file-saver";
import { motion } from "framer-motion";
import { useLiveData } from "@/hooks/useLiveData";
import { useEffect, useState } from "react";

type RevenueItem = {
  category: string;
  revenue: number;
};

type RawAnalytics = {
  revenueByCategory: {
    [key: string]: {
      category: string;
      totalRevenue: number;
    };
  };
};

const transform = (val: RawAnalytics): RevenueItem[] => {
  const revenueData = val.revenueByCategory || {};
  return Object.entries(revenueData).map(([category, entry]) => ({
    category, // key is the category name
    revenue: Number(entry.totalRevenue) || 0,
  }));
};

export default function RevenueByCategoryChart() {
  const { data, isUpdating, error, retry } = useLiveData<
    RevenueItem,
    RawAnalytics
  >("analytics", transform);

  const handleExportCSV = () => {
    const csvHeader = "Category,Revenue\n";
    const csvRows = data
      .map((item) => `${item.category},${item.revenue}`)
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "revenue_by_category.csv");
  };

  // Inside your component
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => setIsDarkMode(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-zinc-900 rounded-xl p-4 shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          Revenue by Category (Live)
        </h2>
        <div className="flex items-center gap-3">
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
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDarkMode ? "#444" : "#ccc"}
            />
            <XAxis
              dataKey="category"
              stroke={isDarkMode ? "#ccc" : "#333"} // Axis line
              tick={{ fill: isDarkMode ? "#000" : "#1f2937", fontSize: 12 }} // Tick labels
            />

            <YAxis
              stroke={isDarkMode ? "#ccc" : "#333"}
              tick={{ fill: isDarkMode ? "#000" : "#1f2937", fontSize: 12 }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                borderColor: isDarkMode ? "#4b5563" : "#e5e7eb",
                color: isDarkMode ? "#f3f4f6" : "#111827",
              }}
              itemStyle={{
                color: isDarkMode ? "#f3f4f6" : "#111827",
              }}
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
