import {
  BarChart,
  Bar,
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

type RevenueItem = {
  category: string;
  revenue: number;
};

export default function RevenueByCategoryChart() {
  const [data, setData] = useState<RevenueItem[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const revenueRef = ref(db, "revenueByCategory");

    const unsubscribe = onValue(revenueRef, (snapshot) => {
      const val = snapshot.val();

      if (val) {
        const revenueData = val.revenueByCategory || {};
        const parsed = Object.entries(revenueData).map(([key, entry]) => {
          const typedEntry = entry as { category: string; revenue: number };
          return {
            category: typedEntry.category,
            revenue: Number(typedEntry.revenue) || 0,
          };
        });

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
          Revenue by Category (Live)
        </h2>
        {isUpdating && (
          <span className="text-sm text-amber-500 animate-pulse">
            Updating…
          </span>
        )}
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </motion.section>
  );
}
