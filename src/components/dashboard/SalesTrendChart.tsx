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

type SalesTrendItem = {
  date: string;
  sales: number;
};

export default function SalesTrendsChart() {
  const [data, setData] = useState<SalesTrendItem[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const trendsRef = ref(db, "revenueByCategory");

    const unsubscribe = onValue(trendsRef, (snapshot) => {
      const val = snapshot.val();

      if (val?.salesTrends) {
        const parsed: SalesTrendItem[] = Object.entries(val.salesTrends).map(
          ([date, entry]) => {
            const typedEntry = entry as { totalSales: number };
            return {
              date,
              sales: Number(typedEntry.totalSales) || 0,
            };
          }
        );

        // Optional: Sort by date
        parsed.sort((a, b) => a.date.localeCompare(b.date));

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
          Sales Trends (Live)
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
