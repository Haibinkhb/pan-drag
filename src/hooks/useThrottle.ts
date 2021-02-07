import { useRef, useEffect, useCallback, DependencyList } from "react";
const useThrottle = (
  fn: Function,
  delay: number = 300,
  dep: DependencyList = []
) => {
  interface initRefType {
    fn: Function;
    timer: any;
  }
  const initRef: initRefType = {
    fn,
    timer: null,
  };
  const { current } = useRef(initRef);
  useEffect(() => {
    current.fn = fn;
  }, [fn, current]);

  return useCallback(
    (...args) => {
      if (!current.timer) {
        current.timer = setTimeout(() => {
          delete current.timer;
        }, delay);
        current.fn.call(this, ...args);
      }
    },
    dep
  );
};

export default useThrottle;
