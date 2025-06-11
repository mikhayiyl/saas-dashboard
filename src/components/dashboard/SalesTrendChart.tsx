import { useLiveData } from "@/hooks/useLiveData";
import { motion } from "framer-motion";
import { saveAs } from "file-saver";
import { format, parseISO, startOfWeek, startOfMonth } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo, useState } from "react";

//  display type
type SalesTrendItem = {
  date: string;
  sales: number;
};

// Raw Firebase structure type
type RawAnalytics = {
  salesTrend: {
    [date: string]: {
      totalSales: number;
    };
  };
};

// Transform logic for daily
const transform = (val: RawAnalytics): SalesTrendItem[] => {
  return Object.entries(val?.salesTrend || {}).map(([date, entry]) => ({
    date,
    sales: entry?.totalSales ?? 0,
  }));
};

// Period options
const periods = ["Daily", "Weekly", "Monthly"] as const;
type PeriodType = (typeof periods)[number];

// Group by week or month
const groupDataByPeriod = (
  data: SalesTrendItem[],
  period: PeriodType
): SalesTrendItem[] => {
  if (period === "Daily") return data;

  const grouped: Record<string, number> = {};

  data.forEach(({ date, sales }) => {
    const key =
      period === "Weekly"
        ? format(startOfWeek(parseISO(date)), "yyyy-MM-dd")
        : format(startOfMonth(parseISO(date)), "yyyy-MM");

    grouped[key] = (grouped[key] || 0) + sales;
  });

  return Object.entries(grouped).map(([date, sales]) => ({ date, sales }));
};

export default function SalesTrendsChart() {
  const [period, setPeriod] = useState<PeriodType>("Daily");

  const { data, isUpdating, error, retry } = useLiveData<
    SalesTrendItem,
    RawAnalytics
  >("analytics", transform);

  const filteredData = useMemo(
    () => groupDataByPeriod(data, period),
    [data, period]
  );

  const handleExportCSV = () => {
    const csvHeader = "Date,Sales\n";
    const csvRows = filteredData
      .map((item) => `${item.date},${item.sales}`)
      .join("\n");
    const blob = new Blob([csvHeader + csvRows], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, `sales_trends_${period.toLowerCase()}.csv`);
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
          Sales Trends (Live)
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
            className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded hover:bg-green-200 transition dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
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
            aria-label="Retry loading sales trends"
          >
            Retry
          </button>
        </div>
      )}

      {filteredData.length === 0 && !error ? (
        <div className="h-[250px] w-full grid grid-cols-12 gap-2 px-4 py-6">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="col-span-1 flex flex-col items-center">
              <Skeleton className="h-24 w-1.5 bg-gray-300 dark:bg-zinc-700 rounded" />
              <Skeleton className="mt-2 h-3 w-6 bg-gray-300 dark:bg-zinc-700 rounded" />
            </div>
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
              dataKey="sales"
              stroke="#10b981"
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
