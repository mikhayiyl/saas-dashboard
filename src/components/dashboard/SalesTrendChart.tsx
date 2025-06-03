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
import { motion, AnimatePresence } from "framer-motion";

export default function SalesTrendChart() {
  const [data, setData] = useState([
    { month: "Jan", sales: 1000 },
    { month: "Feb", sales: 1400 },
    { month: "Mar", sales: 1600 },
    { month: "Apr", sales: 2000 },
    { month: "May", sales: 2500 },
  ]);

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUpdating(true);

      setTimeout(() => {
        setData((prev) => {
          const nextSales =
            prev[prev.length - 1].sales + Math.floor(Math.random() * 300);
          const nextMonth = `M${prev.length + 1}`;
          return [...prev.slice(1), { month: nextMonth, sales: nextSales }];
        });

        setIsUpdating(false);
      }, 1000); // simulate loading delay
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
          Sales Trends (Live)
        </h2>
        <AnimatePresence>
          {isUpdating && (
            <motion.span
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-sm text-orange-500 animate-pulse"
            >
              Updating...
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="sales"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.section>
  );
}
