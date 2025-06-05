import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db } from "@/lib/firebase";

export function useRevenueByCategory<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const dbRef = ref(db, path);

    const unsubscribe = onValue(dbRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        setIsUpdating(true);
        setData(val);
        setTimeout(() => setIsUpdating(false), 800);
      }
    });

    return () => unsubscribe();
  }, [path]);

  return { data, isUpdating };
}
