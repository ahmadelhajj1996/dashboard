import { useEffect, useState } from "react";

export function useSelect(fetcher) {
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOptions = async () => {
    try {
      setLoading(true);

      const data = await fetcher();

      setOptions(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOptions();
  }, []);

  return {
    options,
    loading,
    reload: loadOptions,
  };
}