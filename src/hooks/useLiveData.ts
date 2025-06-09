import { db } from "@/lib/firebase";
import { onValue, ref } from "firebase/database";
import { useEffect, useMemo, useState } from "react";

export function useLiveData<T, Raw extends Record<string, unknown>>(
  path: string,
  transform: (val: Raw) => T[]
) {
  const [data, setData] = useState<T[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Memoize transform avoid inifinite loops
  const stableTransform = useMemo(() => transform, [transform]);

  useEffect(() => {
    let isMounted = true;
    setIsUpdating(true);

    const dbRef = ref(db, path);
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        if (!isMounted) return;

        try {
          const val = snapshot.val();
          setData(val ? stableTransform(val) : []);
          setError(null);
        } catch (err) {
          setError(err as Error);
          setData([]);
        }

        setTimeout(() => {
          if (isMounted) setIsUpdating(false);
        }, 300); // Debounce delay
      },
      (err: Error) => {
        if (!isMounted) return;

        setError(err);
        setData([]);
        setIsUpdating(false);
      }
    );

    return () => {
      isMounted = false;
      unsubscribe();
    };
  }, [path, stableTransform]);

  return {
    data,
    isUpdating,
    error,
    retry: () => window.location.reload(), // Fallback recovery
  };
}
