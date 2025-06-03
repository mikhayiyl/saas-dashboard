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
import { motion, AnimatePresence } from "framer-motion";

const initialData = [
  { category: "Electronics", revenue: 24000 },
  { category: "Clothing", revenue: 18000 },
  { category: "Home", revenue: 12000 },
  { category: "Books", revenue: 8000 },
];

export default function RevenueByCategoryChart() {
  const [data, setData] = useState(initialData);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);

      setTimeout(() => {
        setData((prev) =>
          prev.map((item) => ({
            ...item,
            revenue: item.revenue + Math.floor(Math.random() * 5000 - 2500), // fluctuate ±2.5k
          }))
        );
        setIsUpdating(false);
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
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
        <AnimatePresence>
          {isUpdating && (
            <motion.span
              key="live"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-amber-500 animate-pulse"
            >
              Updating...
            </motion.span>
          )}
        </AnimatePresence>
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
