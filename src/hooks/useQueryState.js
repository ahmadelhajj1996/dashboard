import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function useQueryState(initialState) {
  const [searchParams, setSearchParams] = useSearchParams();

  /*
   |--------------------------------------------------------------------------
   | Build State From URL
   |--------------------------------------------------------------------------
   */

  const getStateFromUrl = () => {
    const state = {};

    Object.keys(initialState).forEach((key) => {
      state[key] =
        searchParams.get(key) ?? initialState[key];
    });

    return state;
  };

  /*
   |--------------------------------------------------------------------------
   | State
   |--------------------------------------------------------------------------
   */

  const [filters, setFiltersState] = useState(
    getStateFromUrl,
  );

  /*
   |--------------------------------------------------------------------------
   | URL -> State
   |--------------------------------------------------------------------------
   | Handles browser back/forward
   */

  useEffect(() => {
    const nextState = getStateFromUrl();

    setFiltersState((prev) => {
      const prevString = JSON.stringify(prev);
      const nextString = JSON.stringify(nextState);

      // prevent unnecessary rerender
      if (prevString === nextString) {
        return prev;
      }

      return nextState;
    });
  }, [searchParams]);

  /*
   |--------------------------------------------------------------------------
   | State -> URL
   |--------------------------------------------------------------------------
   */

  useEffect(() => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (
        value !== "" &&
        value !== null &&
        value !== undefined
      ) {
        params.set(key, value);
      }
    });

    const nextQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (nextQuery !== currentQuery) {
      setSearchParams(params);
    }
  }, [filters]);

  /*
   |--------------------------------------------------------------------------
   | Set Single Filter
   |--------------------------------------------------------------------------
   */

  const setFilter = useCallback((key, value) => {
    setFiltersState((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  /*
   |--------------------------------------------------------------------------
   | Set Multiple Filters
   |--------------------------------------------------------------------------
   */

  const setFilters = useCallback((values) => {
    setFiltersState((prev) => ({
      ...prev,
      ...values,
    }));
  }, []);

  /*
   |--------------------------------------------------------------------------
   | Reset Filters
   |--------------------------------------------------------------------------
   */

  const resetFilters = useCallback(() => {
    setFiltersState(initialState);
  }, [initialState]);

  return {
    filters,
    setFilter,
    setFilters,
    resetFilters,
  };
}