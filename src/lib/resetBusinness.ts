import { getDatabase, ref, set } from "firebase/database";

// You can define the default empty structure for each collection
export async function resetBusinessData() {
  const db = getDatabase();

  const defaultValues: Record<string, any> = {
    // products: [], // assuming this is an array of product objects
    // "product-performance": [], // same
    // analytics: {}, // assuming analytics is an object with metrics
    // revenue: [], // list of revenue entries
    //   orders: [], // order list if you have it
    users: [],
    settings: {},
  };

  const resets = Object.entries(defaultValues).map(([path, value]) =>
    set(ref(db, path), value)
  );

  await Promise.all(resets);
}
