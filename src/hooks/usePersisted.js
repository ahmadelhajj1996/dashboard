import { useEffect, useState } from "react";

export default function usePersisted(key, initialValue) {
  const [state, setState] = useState(() => {
    try {
      const storedValue = localStorage.getItem(key);

      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Failed to load persisted state:", error);

      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("Failed to save persisted state:", error);
    }
  }, [key, state]);

  return [state, setState];
}
