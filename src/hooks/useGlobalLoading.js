import { useQueryClient } from "@tanstack/react-query";

export function useGlobalLoading() {
  const queryClient = useQueryClient();

  const queries = queryClient.getQueryCache().findAll();

  const isLoading = queries.some((query) => {
    const state = query.state;

    // only loading if:
    // 1. currently fetching
    // 2. AND no cached data yet
    return state.fetchStatus === "fetching" && state.data === undefined;
  });

  return isLoading;
}



