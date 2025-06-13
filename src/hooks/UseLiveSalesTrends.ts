import { useLiveData } from "./useLiveData";

//  display type
export type SalesTrendItem = {
  date: string;
  sales: number;
};

// Raw Firebase structure type
type RawAnalytics = {
  salesTrend: {
    [date: string]: {
      totalSales: number;
    };
  };
};

// Transform logic for daily
const transform = (val: RawAnalytics): SalesTrendItem[] => {
  return Object.entries(val?.salesTrend || {}).map(([date, entry]) => ({
    date,
    sales: entry?.totalSales ?? 0,
  }));
};

const UseLiveSalesTrends = () => {
  const { data, isUpdating, error, retry } = useLiveData<
    SalesTrendItem,
    RawAnalytics
  >("analytics", transform);

  return {
    data,
    isUpdating,
    error,
    retry,
  };
};

export default UseLiveSalesTrends;
