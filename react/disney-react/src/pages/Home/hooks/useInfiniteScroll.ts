import { useEffect, useState, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface useInfiniteScrollProps<T> {
  data: T[];
  perPage: number;
  loadingTime?: number;
}

export default function useInfiniteScroll<T>({
  data,
  perPage,
  loadingTime = 1000,
}: useInfiniteScrollProps<T>) {
  const { ref: observerRef, inView } = useInView();
  const [curPage, setCurPage] = useState(0);

  const [loadedData, setLoadedData] = useState<T[]>([]);
  const [willLoadData, setWillLoadData] = useState<T[]>([]);

  const throttle = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const maxPage = Math.ceil(data.length / perPage);
    if (inView && !throttle.current && curPage < maxPage) {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      setIsLoading(true);
      throttle.current = true;
      const nextDataStart = curPage * perPage;
      const nextData = data.slice(nextDataStart, nextDataStart + perPage);
      setWillLoadData(nextData);
      setCurPage((prevPage) => prevPage + 1);

      timeoutIdRef.current = setTimeout(() => {
        setIsLoading(false);
        setLoadedData((prevLoadedData) => [...prevLoadedData, ...nextData]);
        throttle.current = false;
        setWillLoadData([]);
      }, loadingTime);
    }
  }, [inView, curPage, data, perPage, loadingTime]);

  useEffect(() => {
    if (timeoutIdRef.current) {
      clearTimeout(timeoutIdRef.current);
    }
    setCurPage(0);
    setIsLoading(false);
    setLoadedData([]);
    throttle.current = false;
    setWillLoadData([]);
  }, [data, perPage]);

  return {
    observerRef,
    loadedData,
    willLoadData,
    isLoading,
    pageInfo: { curPage, maxPage: Math.ceil(data.length / perPage) },
  };
}
