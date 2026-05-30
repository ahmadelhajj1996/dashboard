import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function useSidebar() {
  const location = useLocation();
  const STORAGE_KEY = "active-sidebar-link";

  const [currentLink, setCurrentLink] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || location.pathname;
  });

  // sync with URL changes
  useEffect(() => {
    setCurrentLink(location.pathname);
    localStorage.setItem(STORAGE_KEY, location.pathname);
  }, [location.pathname]);

  const handleChange = (link) => {
    setCurrentLink(link);
    localStorage.setItem(STORAGE_KEY, link);
  };

  return {
    currentLink,
    handleChange,
  };
}
