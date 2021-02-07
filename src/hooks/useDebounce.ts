import { useEffect, useState } from "react";

const useDebounce = (value: any, delay: number = 300) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debounceValue;
};

export default useDebounce;
