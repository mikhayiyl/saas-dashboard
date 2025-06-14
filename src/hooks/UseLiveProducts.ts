import type { ProductPerformance } from "@/types/ProductPerformce";
import { useLiveData } from "./useLiveData";

type ProductPerformanceItem = {
  name: string;
  score: number;
  rating: number;
  price: number;
  category: string;
  sales: number;
  returns: number;
};

const transformPerformanceData = (
  val: ProductPerformance
): ProductPerformanceItem[] => {
  return Object.entries(val || {}).map(([_, entry]) => ({
    name: entry.name,
    score: entry.sales - entry.returns,
    rating: entry.rating,
    price: entry.price,
    category: entry.category,
    sales: entry.sales,
    returns: entry.returns,
  }));
};
const UseLiveProducts = () => {
  const { data, isUpdating, error, retry } = useLiveData<
    ProductPerformanceItem,
    ProductPerformance
  >("product-performance", transformPerformanceData);

  return { data, isUpdating, error, retry };
};

export default UseLiveProducts;
