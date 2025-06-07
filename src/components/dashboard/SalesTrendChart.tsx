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

type SalesTrendItem = {
  date: string;
  sales: number;
};

export default function SalesTrendsChart() {
  const { data, isUpdating } = useLiveData<SalesTrendItem>(
    "revenueByCategory",
    (val) => {
      const salesData = val.salesTrends || {};

      const parsed: SalesTrendItem[] = Object.entries(salesData).map(
        ([date, entry]) => {
          const typedEntry = entry as { totalSales: number };
          return {
            date,
            sales: Number(typedEntry.totalSales) || 0,
          };
        }
      );

      return parsed.sort((a, b) => a.date.localeCompare(b.date));
    }
  );

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
      className="bg-white rounded-xl p-4 shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Sales Trends (Live)
        </h2>
        <div className="flex items-center gap-3">
          {isUpdating && (
            <span className="text-sm text-amber-500 animate-pulse">
              Updating…
            </span>
          )}
          <button
            onClick={handleExportCSV}
            className="px-2 py-1 text-xs bg-green-100 text-green-600 rounded hover:bg-green-200 transition"
          >
            Export CSV
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
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
    </motion.section>
  );
}
