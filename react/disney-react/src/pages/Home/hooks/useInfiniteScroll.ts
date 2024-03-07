import { useEffect, useState } from "react";
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
  const [maxPage, setMaxPage] = useState(0);
  const [curPage, setCurPage] = useState(0);
  const [loadedData, setLoadedData] = useState<T[]>([]);
  const [willLoadData, setWillLoadData] = useState<T[]>([]);
  const [throttle, setThrottle] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (inView && !throttle && !isLoading && curPage < maxPage) {
      setIsLoading(true);
      setThrottle(true);
      const nextDataStart = curPage * perPage;
      const nextData = data.slice(nextDataStart, nextDataStart + perPage);
      setWillLoadData(nextData);
      setCurPage((prevPage) => prevPage + 1);

      setTimeout(() => {
        setIsLoading(false);
        setLoadedData((prevLoadedData) => [...prevLoadedData, ...nextData]);
        setThrottle(false);
        setWillLoadData([]);
      }, loadingTime);
    }
  }, [
    inView,
    curPage,
    data,
    perPage,
    throttle,
    isLoading,
    loadingTime,
    maxPage,
  ]);

  useEffect(() => {
    setMaxPage(Math.ceil(data.length / perPage));
  }, [data, perPage]);

  return {
    observerRef,
    loadedData,
    willLoadData,
    isLoading,
    pageInfo: { curPage, maxPage },
  };
}
