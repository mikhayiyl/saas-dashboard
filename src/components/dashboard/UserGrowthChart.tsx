import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";
import { motion } from "framer-motion";

type UserGrowthItem = {
  date: string;
  users: number;
};

export default function UserGrowthChart() {
  const [data, setData] = useState<UserGrowthItem[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const growthRef = ref(db, "userGrowth");

    const unsubscribe = onValue(growthRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const parsed: UserGrowthItem[] = Object.values(val).map(
          (entry: any) => ({
            date: entry.date ?? "Unknown",
            users: Number(entry.users) || 0,
          })
        );
        setIsUpdating(true);
        setData(parsed);
        setTimeout(() => setIsUpdating(false), 800);
      }
    });

    return () => unsubscribe();
  }, []);

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
          <XAxis dataKey="date" />
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
