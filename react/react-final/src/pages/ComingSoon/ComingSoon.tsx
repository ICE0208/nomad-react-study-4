import { IMovie } from "@/api";
import { MovieDetailModal, MovieList } from "@/components";
import usePreventDirectModal from "@/hooks/usePreventDirectModal";
import { UseQueryResult } from "@tanstack/react-query";
import { LayoutGroup } from "framer-motion";
import { useOutletContext, useParams } from "react-router-dom";

export default function Popular() {
  const { results } = useOutletContext() as {
    results: UseQueryResult<IMovie[], Error>[];
  };

  const isLoading = results[2].isLoading;
  const result = results[2].data;

  const params = useParams();
  usePreventDirectModal();

  return (
    <LayoutGroup id="coming-soon">
      <div className="flex flex-col items-center overflow-hidden px-16 py-12 font-serif">
        <h1 className="mb-12 mt-4 text-3xl">- Coming Soon -</h1>
        {!isLoading && <MovieList datas={result ?? []} />}
      </div>
      {params?.id && <MovieDetailModal />}
    </LayoutGroup>
  );
}
