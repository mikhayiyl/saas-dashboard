import { useLiveData } from "./useLiveData";

type RevenueItem = {
  category: string;
  revenue: number;
};

type RawProductPerformance = {
  [product: string]: {
    name: string;
    category: string;
    sales: number;
    returns: number;
    rating: number;
    price: number;
  };
};

const transform = (val: RawProductPerformance): RevenueItem[] => {
  const revenueMap: Record<string, number> = {};

  Object.values(val || {}).forEach(({ category, sales, returns, price }) => {
    const netSales = (sales ?? 0) - (returns ?? 0);
    const totalRevenue = netSales * (price ?? 0);

    if (!category) return;

    if (revenueMap[category]) {
      revenueMap[category] += totalRevenue;
    } else {
      revenueMap[category] = totalRevenue;
    }
  });

  return Object.entries(revenueMap).map(([category, revenue]) => ({
    category,
    revenue,
  }));
};

const UseLiveRevenue = () => {
  const { data, isUpdating, error, retry } = useLiveData<
    RevenueItem,
    RawProductPerformance
  >("product-performance", transform);

  return { data, isUpdating, error, retry };
};

export default UseLiveRevenue;
