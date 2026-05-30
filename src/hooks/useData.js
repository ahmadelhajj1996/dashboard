import { useMemo } from "react";
import { useGet } from "./useApi";

export const useMessages = (options = {}) => {
  return useGet(["messages"], "messages", {
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    ...options,
  });
};

export const useAttributes = (options = {}) => {
  return useGet(["attributes"], "attributes", {
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    select: (response) => response?.data?.data || [],
    ...options,
  });
};

export const useAttributeOptions = (attribute_id = null, options = {}) => {
  return useGet(["attributes-options", attribute_id], "attributes-options", {
    staleTime: Infinity,

    select: (response) => {
      const data = response?.data?.data || [];

      if (!attribute_id) return data;

      return data.filter((item) => item.attribute_id == attribute_id);
    },

    ...options,
  });
};

// const queryKey = useMemo(
//   () => ["categories", parent_id ?? null],
//   [parent_id],
// );

export const useCategories = (parent_id = null, options = {}) => {
  const queryKey = useMemo(
    () => ["categories", parent_id ?? null],
    [parent_id],
  );
  return useGet(queryKey, "categories", {
    staleTime: Infinity,

    gcTime: Infinity,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    placeholderData: [],

    select: (response) => response?.data || [],

    ...options,
  });
};

// Products ...

export const useProducts = (subcategory, options = {}) => {
  return useGet(
    ["products", subcategory],

    subcategory ? `products?category_id=${subcategory}` : "products",

    {
      enabled: true,

      // staleTime: 1000 * 60 * 10,

      // gcTime: 1000 * 60 * 30,

      // refetchOnMount: false,
      // refetchOnWindowFocus: false,
      // refetchOnReconnect: false,

      placeholderData: [],

      select: (response) => response?.data?.data || [],

      ...options,
    },
  );
};

// Exchange Rates
export const useExchangeRates = (options = {}) =>
  useGet(["exchange-rates"], "exchange-rates", {
    staleTime: 1000 * 60 * 60 * 24,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    select: (response) => response?.data ?? [],
    ...options,
  });

// variations

export const useVariations = (product_id = null, options = {}) => {
  const query = useMemo(() => {
    if (!product_id) {
      return "variations";
    }

    return `variations?product_id=${product_id}`;
  }, [product_id]);

  const queryKey = useMemo(
    () => ["variations", product_id ?? null],
    [product_id],
  );

  return useGet(queryKey, query, {
    enabled: true,

    // staleTime: 1000 * 60 * 10,

    // gcTime: 1000 * 60 * 30,

    // refetchOnMount: false,

    // refetchOnWindowFocus: false,

    // refetchOnReconnect: false,

    // placeholderData: [],

    select: (response) => response?.data?.data || [],

    ...options,
  });
};

export const useOrders = (clientId = null, options = {}) => {
  const queryKey = useMemo(() => ["orders", clientId ?? null], [clientId]);

  const url = useMemo(
    () => (clientId ? `orders?client_id=${clientId}` : "orders"),
    [clientId],
  );

  return useGet(queryKey, url, {
    staleTime: Infinity,

    gcTime: Infinity,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    placeholderData: [],

    select: (response) => response?.data?.data || [],

    ...options,
  });
};

export const useUsers = (options = {}) => {
  return useGet(["clients"], "clients", {
    staleTime: Infinity,

    gcTime: Infinity,

    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    placeholderData: [],

    select: (response) => response?.data?.data || [],

    ...options,
  });
};
