import { useLiveData } from "@/hooks/useLiveData";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, parseISO, startOfWeek, startOfMonth } from "date-fns";
import { useMemo, useState } from "react";

// Display type
type UserGrowthItem = {
  date: string;
  users: number;
};

// Raw Firebase structure type
type RawAnalytics = {
  userGrowth: {
    [date: string]: {
      newUsers: number;
    };
  };
};

// Transform logic for daily
const transform = (val: RawAnalytics): UserGrowthItem[] => {
  return Object.entries(val?.userGrowth || {}).map(([date, entry]) => ({
    date,
    users: entry?.newUsers ?? 0,
  }));
};

// Period options
const periods = ["Daily", "Weekly", "Monthly"] as const;
type PeriodType = (typeof periods)[number];

// Group by week or month
const groupDataByPeriod = (
  data: UserGrowthItem[],
  period: PeriodType
): UserGrowthItem[] => {
  if (period === "Daily") return data;

  const grouped: Record<string, number> = {};

  data.forEach(({ date, users }) => {
    const key =
      period === "Weekly"
        ? format(startOfWeek(parseISO(date)), "yyyy-MM-dd")
        : format(startOfMonth(parseISO(date)), "yyyy-MM");

    grouped[key] = (grouped[key] || 0) + users;
  });

  return Object.entries(grouped).map(([date, users]) => ({ date, users }));
};

export default function UserGrowthChart() {
  const [period, setPeriod] = useState<PeriodType>("Daily");

  const { data, isUpdating, error, retry } = useLiveData<
    UserGrowthItem,
    RawAnalytics
  >("analytics", transform);

  const filteredData = useMemo(
    () => groupDataByPeriod(data, period),
    [data, period]
  );

  const handleExportCSV = () => {
    const csvHeader = "Date,Users\n";
    const csvRows = filteredData
      .map((item) => `${item.date},${item.users}`)
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, `user_growth_${period.toLowerCase()}.csv`);
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
          User Growth (Live)
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

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value as PeriodType)}
            className="text-sm bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-200 px-2 py-1 rounded focus:outline-none"
          >
            {periods.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>

          <button
            onClick={handleExportCSV}
            className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition dark:bg-blue-900 dark:text-blue-300 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
            disabled={isUpdating}
            className="ml-2 px-2 py-1 text-xs bg-red-200 text-red-600 rounded hover:bg-red-300 transition dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
            aria-label="Retry loading user growth data"
          >
            Retry
          </button>
        </div>
      )}

      {filteredData.length === 0 && !error ? (
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
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(str) =>
                format(
                  parseISO(str),
                  period === "Monthly" ? "MMM yyyy" : "MMM d"
                )
              }
            />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--foreground)",
                color: "var(--background)",
              }}
            />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 3 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </motion.section>
  );
}
