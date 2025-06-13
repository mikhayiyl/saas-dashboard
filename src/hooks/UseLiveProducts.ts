import { useLiveData } from "./useLiveData";

type ProductPerformanceItem = {
  name: string;
  score: number;
  rating: number;
};

type RawProductPerformance = {
  [product: string]: {
    name: string;
    sales: number;
    returns: number;
    rating: number;
  };
};

const transformPerformanceData = (
  val: RawProductPerformance
): ProductPerformanceItem[] => {
  return Object.entries(val || {}).map(([_, entry]) => ({
    name: entry.name,
    score: entry.sales - entry.returns,
    rating: entry.rating,
  }));
};
const UseLiveProducts = () => {
  const { data, isUpdating, error, retry } = useLiveData<
    ProductPerformanceItem,
    RawProductPerformance
  >("product-performance", transformPerformanceData);

  return { data, isUpdating, error, retry };
};

export default UseLiveProducts;
