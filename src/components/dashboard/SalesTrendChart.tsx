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

// Transform logic - moved outside to prevent redefinition
const transform = (val: RawAnalytics): SalesTrendItem[] => {
  return Object.entries(val?.salesTrend || {}).map(([date, entry]) => ({
    date,
    sales: entry?.totalSales ?? 0,
  }));
};

export default function SalesTrendsChart() {
  const { data, isUpdating, error, retry } = useLiveData<
    SalesTrendItem,
    RawAnalytics
  >("analytics", transform);

  const handleExportCSV = () => {
    const csvHeader = "Date,Sales\n";
    const csvRows = data.map((item) => `${item.date},${item.sales}`).join("\n");
    const blob = new Blob([csvHeader + csvRows], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "sales_trends.csv");
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
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
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
