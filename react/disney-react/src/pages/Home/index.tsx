import { useQuery } from "@tanstack/react-query";
import getCharacters from "@/services/api/getCharacters";
import {
  CharacterCard,
  CharacterCardSkeleton,
  Observer,
  TopButton,
} from "./components";
import { useInfiniteScroll } from "./hooks";
import { useEffect } from "react";

const perPage = 16;

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getCharacters,
    queryKey: ["characters"],
  });
  const {
    observerRef,
    loadedData,
    willLoadData,
    isLoading: scrollLoading,
    pageInfo: { curPage, maxPage },
  } = useInfiniteScroll({
    data: data?.slice(perPage) ?? [],
    perPage,
  });

  let content = <h1>?</h1>;

  if (isLoading) {
    content = (
      <>
        {Array.from({ length: perPage }, (_, i) => i).map((_, i) => (
          <CharacterCardSkeleton key={`skeleton-${i}`} />
        ))}
      </>
    );
  }

  if (isError) {
    content = <h1>Something is wrong. {error.message || ""}</h1>;
  }

  if (data) {
    content = (
      <>
        {data.slice(0, perPage).map((character) => (
          <CharacterCard key={character.id} {...character} />
        ))}
        {loadedData.map((character) => (
          <CharacterCard key={`loaded-${character.id}`} {...character} />
        ))}
        {scrollLoading && (
          <>
            {/* 스켈레톤 컴포넌트를 보여주는 동안 이미지를 미리 로드시킵니다. */}
            {willLoadData.map((character) => {
              const img = new Image();
              img.src = character.imageUrl;
            })}
            {Array.from({ length: perPage }, (_, i) => i).map((_, i) => (
              <CharacterCardSkeleton key={`skeleton-${i}`} />
            ))}
          </>
        )}
      </>
    );
  }

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-5 grid min-h-screen w-full max-w-[1800px] grid-cols-[repeat(auto-fill,minmax(360px,1fr))] justify-items-center gap-x-10 gap-y-6 p-6 sm:flex sm:flex-col sm:items-center">
        {content}
      </div>
      {/* Scroll Observer */}
      <Observer
        ref={observerRef}
        visible={data && !scrollLoading && curPage < maxPage}
      />
      {/* Top Button */}
      <TopButton />
    </div>
  );
}
