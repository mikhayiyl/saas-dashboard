export type ProductPerformance = {
  [product: string]: {
    name: string;
    category: string;
    sales: number;
    returns: number;
    rating: number;
    price: number;
  };
};
