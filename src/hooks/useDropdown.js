import { useEffect, useRef, useState } from "react";

export const useDropdown = () => {
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const toggle = () => setOpen((prev) => !prev);

  const close = () => setOpen(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    open,
    toggle,
    close,
    dropdownRef,
  };
};