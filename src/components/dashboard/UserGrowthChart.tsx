import { useLiveData } from "@/hooks/useLiveData";
import { motion } from "framer-motion";
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
        {isUpdating && (
          <span className="text-sm text-amber-500 animate-pulse">
            Updating…
          </span>
        )}
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
