import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

export function useRevenueByCategory<T>(
  path: string,
  transform: (val: any) => T[]
) {
  const [data, setData] = useState<T[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const dbRef = ref(db, path);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setData(transform(val));
        setIsUpdating(true);
        setTimeout(() => setIsUpdating(false), 800);
      }
    });

    return () => unsubscribe();
  }, [path]);

  return { data, isUpdating };
}
