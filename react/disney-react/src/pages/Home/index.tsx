import { useQuery } from "@tanstack/react-query";
import getCharacters from "@/services/api/getCharacters";
import { CharacterCard, CharacterCardSkeleton } from "./components";
import { useInfiniteScroll } from "./hooks";

const perPage = 16;

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getCharacters,
    queryKey: ["characters"],
  });
  const {
    observerRef,
    loadedData,
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
        {data.slice(2, 16).map((character) => (
          <CharacterCard
            key={character.id}
            imgUrl={character.imageUrl}
            name={character.name}
          />
        ))}
        {loadedData.map((character) => (
          <CharacterCard
            key={`loaded-${character.id}`}
            imgUrl={character.imageUrl}
            name={character.name}
          />
        ))}
        {scrollLoading && (
          <>
            {Array.from({ length: perPage }, (_, i) => i).map((_, i) => (
              <CharacterCardSkeleton key={`skeleton-${i}`} />
            ))}
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div className="mb-5 grid min-h-screen grid-cols-[repeat(auto-fill,minmax(360px,1fr))] justify-items-center gap-x-10 gap-y-6 p-6 sm:flex sm:flex-col sm:items-center">
        {content}
      </div>
      {/* Scroll Observer */}
      {data && !scrollLoading && curPage < maxPage && (
        <div ref={observerRef} className="mt-32 h-4"></div>
      )}
    </>
  );
}
