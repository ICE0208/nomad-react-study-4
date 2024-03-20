import { IMovie } from "@/api";
import { MovieDetailModal, MovieList } from "@/components";
import { UseQueryResult } from "@tanstack/react-query";
import { LayoutGroup } from "framer-motion";
import { useOutletContext, useParams } from "react-router-dom";

export default function Popular() {
  const { results } = useOutletContext() as {
    results: UseQueryResult<IMovie[], Error>[];
  };

  const isLoading = results[1].isLoading;
  const result = results[1].data;

  const params = useParams();

  return (
    <LayoutGroup id="now-playing">
      <div className="flex flex-col items-center overflow-hidden px-16 py-12 font-serif">
        <h1 className="mb-12 text-3xl">- Now Playing -</h1>
        {!isLoading && <MovieList datas={result ?? []} />}
        {params?.id && <MovieDetailModal />}
      </div>
    </LayoutGroup>
  );
}
