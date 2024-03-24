import { IMovie } from "@/api";
import { UseQueryResult } from "@tanstack/react-query";
import { useOutletContext, useParams } from "react-router-dom";
import { HomeAd, SliderArea } from "./components";
import { LayoutGroup, stagger, useAnimate } from "framer-motion";
import { useEffect } from "react";
import usePreventDirectModal from "@/hooks/usePreventDirectModal";
import { MovieDetailModal } from "@/components";

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

  const params = useParams();
  usePreventDirectModal();

  return (
    <>
      <LayoutGroup>
        <HomeAd datas={results[0].data ?? []} />
        <div ref={scope} className="mt-16 space-y-6 pb-16">
          <div className="slider opacity-0">
            <SliderArea
              title="Popular"
              linkTo="/popular"
              datas={results[0].data ?? []}
            />
          </div>
          <div className="slider opacity-0">
            <SliderArea
              title="Coming Soon"
              linkTo="/coming-soon"
              datas={results[1].data ?? []}
            />
          </div>
          <div className="slider opacity-0">
            <SliderArea
              title="Now Playing"
              linkTo="/now-playing"
              datas={results[2].data ?? []}
            />
          </div>
        </div>
        {params?.id && <MovieDetailModal />}
      </LayoutGroup>
    </>
  );
}
