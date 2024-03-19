import { IMovie } from "@/api";
import { UseQueryResult } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { SliderArea } from "./components";
import { stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";

export default function Home() {
  const { results } = useOutletContext() as {
    results: UseQueryResult<IMovie[], Error>[];
  };
  const [scope, animate] = useAnimate();

  const isLoading = results.some((result) => result.isLoading);

  useEffect(() => {
    if (!isLoading) {
      animate(
        ".slider",
        { opacity: 1 },
        { duration: 0.5, delay: stagger(0.6, { startDelay: 0 }) },
      );
    }
  }, [isLoading, animate, scope]);

  return (
    <>
      <div className="mb-8 h-96 w-full animate-pulse bg-gray-800"></div>
      <div ref={scope} className="mb-32 space-y-2">
        <div className="slider opacity-0">
          <SliderArea title="Popular" datas={results[0].data ?? []} />
        </div>
        <div className="slider opacity-0">
          <SliderArea title="Comming Soon" datas={results[1].data ?? []} />
        </div>
        <div className="slider opacity-0">
          <SliderArea title="Now Playing" datas={results[2].data ?? []} />
        </div>
      </div>
    </>
  );
}
