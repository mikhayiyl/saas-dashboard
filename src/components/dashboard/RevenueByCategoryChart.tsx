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

type RevenueItem = {
  category: string;
  revenue: number;
};

export default function RevenueByCategoryChart() {
  const { data, isUpdating } = useLiveData<RevenueItem>(
    "revenueByCategory",
    (val) => {
      const revenueData = val.revenueByCategory || {};
      return Object.entries(revenueData).map(([_, entry]) => {
        const typedEntry = entry as { category: string; revenue: number };
        return {
          category: typedEntry.category,
          revenue: Number(typedEntry.revenue) || 0,
        };
      });
    }
  );

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

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl p-4 shadow-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Revenue by Category (Live)
        </h2>
        <div className="flex items-center gap-3">
          {isUpdating && (
            <span className="text-sm text-amber-500 animate-pulse">
              Updating…
            </span>
          )}
          <button
            onClick={handleExportCSV}
            className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition"
          >
            Export CSV
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="revenue"
            fill="#3b82f6"
            animationDuration={500}
            isAnimationActive
          />
        </BarChart>
      </ResponsiveContainer>
    </motion.section>
  );
}
