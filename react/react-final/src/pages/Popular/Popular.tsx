import { IMovie } from "@/api";
import { MovieDetailModal, MovieList } from "@/components";
import { UseQueryResult } from "@tanstack/react-query";
import { LayoutGroup } from "framer-motion";
import { useOutletContext, useParams } from "react-router-dom";

export default function Popular() {
  const { results } = useOutletContext() as {
    results: UseQueryResult<IMovie[], Error>[];
  };

  const isLoading = results[0].isLoading;
  const result = results[0].data;

  const params = useParams();

  return (
    <LayoutGroup id="popular">
      <div className="flex flex-col items-center px-16 py-12 font-serif">
        <h1 className="mb-12 text-3xl">- Popular -</h1>
        {!isLoading && <MovieList datas={result ?? []} />}
      </div>
      {params?.id && <MovieDetailModal />}
    </LayoutGroup>
  );
}
