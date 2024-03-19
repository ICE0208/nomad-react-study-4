import { IMovie } from "@/api";
import { UseQueryResult } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { SliderArea } from "./components";

export default function Home() {
  const { results } = useOutletContext() as {
    results: UseQueryResult<IMovie[], Error>[];
  };

  return (
    <>
      <div className="mb-8 h-96 w-full animate-pulse bg-gray-800"></div>
      <div className="mb-32 space-y-16">
        <SliderArea title="Popular" datas={results[0].data ?? []} />
        <SliderArea title="Comming Soon" datas={results[1].data ?? []} />
        <SliderArea title="Now Playing" datas={results[2].data ?? []} />
      </div>
    </>
  );
}
