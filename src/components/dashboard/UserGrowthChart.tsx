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

type UserGrowthItem = {
  date: string;
  users: number;
};

export default function UserGrowthChart() {
  const { data, isUpdating } = useLiveData<UserGrowthItem>(
    "revenueByCategory",
    (val) => {
      const userGrowthData = val.userGrowth || {};

      return Object.entries(userGrowthData).map(([date, entry]) => {
        if (!entry || typeof entry !== "object" || !("activeUsers" in entry)) {
          console.warn(`Invalid entry for date ${date}:`, entry);
          return { date, users: 0 };
        }

        const typedEntry = entry as { activeUsers: number };

        return {
          date,
          users: Number(typedEntry.activeUsers) || 0,
        };
      });
    }
  );

  const handleExportCSV = () => {
    const csvHeader = "Date,Users\n";
    const csvRows = data.map((item) => `${item.date},${item.users}`).join("\n");
    const blob = new Blob([csvHeader + csvRows], {
      type: "text/csv;charset=utf-8",
    });
    saveAs(blob, "user_growth.csv");
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
          User Growth (Live)
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
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" scale="point" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="users"
            stroke="#3b82f6"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.section>
  );
}
