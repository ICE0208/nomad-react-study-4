import { IMovie } from "@/api";
import { UseQueryResult } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { SliderArea } from "./components";

export default function Home() {
  const { results } = useOutletContext() as {
    results: UseQueryResult<IMovie[], Error>[];
  };

  return (
    <div>{<SliderArea title="Popular" datas={results[0].data ?? []} />}</div>
  );
}
