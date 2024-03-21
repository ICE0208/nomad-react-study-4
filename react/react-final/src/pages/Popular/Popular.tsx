import { IMovie } from "@/api";
import { MovieDetailModal, MovieList } from "@/components";
import { useBasePath } from "@/hooks";
import { UseQueryResult } from "@tanstack/react-query";
import { LayoutGroup } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";

export default function Popular() {
  const { results } = useOutletContext() as {
    results: UseQueryResult<IMovie[], Error>[];
  };

  const isLoading = results[0].isLoading;
  const result = results[0].data;

  const params = useParams();
  const firstLoad = useRef(false);
  const basePath = useBasePath();
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.id && !firstLoad.current) {
      navigate(basePath ?? "/", { replace: true });
    }

    firstLoad.current = true;
  }, [params, navigate, basePath]);

  return (
    <>
      <LayoutGroup id="popular">
        <div className="flex flex-col items-center px-16 py-12 font-serif">
          <h1 className="mb-12 text-3xl">- Popular -</h1>
          {!isLoading && <MovieList datas={result ?? []} />}
        </div>
        {params?.id && <MovieDetailModal />}
      </LayoutGroup>
    </>
  );
}

// const content = ({
//   isLoading,
//   result,
//   params,
// }: {
//   isLoading: boolean;
//   result: IMovie[] | undefined;
//   params: Readonly<Params<string>>;
// }) => (
//   <LayoutGroup id="popular">
//     <div className="flex flex-col items-center px-16 py-12 font-serif">
//       <h1 className="mb-12 text-3xl">- Popular -</h1>
//       {!isLoading && <MovieList datas={result ?? []} />}
//     </div>
//     {params?.id && <MovieDetailModal />}
//   </LayoutGroup>
// );
// const MemoContent = memo(content);
