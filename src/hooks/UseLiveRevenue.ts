import { useLiveData } from "./useLiveData";

type RevenueItem = {
  category: string;
  revenue: number;
};

type RawAnalytics = {
  revenueByCategory: {
    [key: string]: {
      category?: string;
      totalRevenue: number;
    };
  };
};

const transform = (val: RawAnalytics): RevenueItem[] => {
  const revenueData = val.revenueByCategory || {};
  return Object.entries(revenueData).map(([category, entry]) => ({
    category,
    revenue: Number(entry.totalRevenue) || 0,
  }));
};
const UseLiveRevenue = () => {
  const { data, isUpdating, error, retry } = useLiveData<
    RevenueItem,
    RawAnalytics
  >("analytics", transform);

  return { data, isUpdating, error, retry };
};

export default UseLiveRevenue;
