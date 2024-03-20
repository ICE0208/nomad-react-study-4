import { IMovie } from "@/api";
import { MovieList } from "@/components";
import { UseQueryResult } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";

export default function Popular() {
  const { results } = useOutletContext() as {
    results: UseQueryResult<IMovie[], Error>[];
  };

  const isLoading = results[0].isLoading;
  const result = results[0].data;

  return (
    <div className="flex flex-col items-center px-16 py-12 font-serif">
      <h1 className="mb-12 text-3xl">- Popular -</h1>
      <MovieList datas={result ?? []} />
    </div>
  );
}
