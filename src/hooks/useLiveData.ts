import { db } from "@/lib/firebase";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

export function useLiveData<T, Raw extends Record<string, unknown>>(
  path: string,
  transform: (val: Raw) => T[]
) {
  const [data, setData] = useState<T[]>([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

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
          setData(val ? transform(val) : []);
          setError(null);
        } catch (err) {
          setError(err as Error);
          setData([]);
        }

        setTimeout(() => {
          if (isMounted) setIsUpdating(false);
        }, 300);
      },
      (err: Error) => {
        if (!isMounted) return;
        setError(err);
        setData([]);
        setIsUpdating(false);
      }
    );

    return () => {
      unsubscribe(); // Stop listening first
      isMounted = false;
    };
  }, [path, transform]);

  const retry = () => {
    setIsUpdating(true);
    setError(null);

    const dbRef = ref(db, path);
    onValue(
      dbRef,
      (snapshot) => {
        try {
          const val = snapshot.val();
          setData(val ? transform(val) : []);
          setError(null);
        } catch (err) {
          setError(err as Error);
          setData([]);
        }

        setTimeout(() => setIsUpdating(false), 300);
      },
      (err: Error) => {
        setError(err);
        setData([]);
        setIsUpdating(false);
      },
      { onlyOnce: true }
    );
  };

  return {
    data,
    isUpdating,
    error,
    retry,
  };
}
