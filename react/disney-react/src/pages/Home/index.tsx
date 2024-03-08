import { useQuery } from "@tanstack/react-query";
import getCharacters from "@/services/api/getCharacters";
import {
  CharacterCard,
  CharacterCardSkeleton,
  Observer,
  TopButton,
} from "./components";
import { useInfiniteScroll } from "./hooks";
import { useEffect, useMemo, useState } from "react";
import { useRecoilValue } from "recoil";
import { searchTextState } from "@/atom";
import { Character } from "@/types";

const perPage = 16;

export default function Home() {
  const [filteredData, setFilteredData] = useState<Character[]>([]);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getCharacters,
    queryKey: ["characters"],
  });

  // 무한 리렌더링을 방지하기 위하여 추가하였습니다.
  const sliceFilteredData = useMemo(
    () => filteredData.slice(perPage),
    [filteredData],
  );
  const sliceData = useMemo(() => data?.slice(perPage) ?? [], [data]);

  const searchTextValue = useRecoilValue(searchTextState);
  const {
    observerRef,
    loadedData,
    willLoadData,
    isLoading: scrollLoading,
    pageInfo: { curPage, maxPage },
  } = useInfiniteScroll({
    data: searchTextValue ? sliceFilteredData : sliceData,
    perPage,
  });

  useEffect(() => {
    // 스크롤을 맨 위로 보냅니다.
    window.scrollTo(0, 0);

    // filter를 이용하여 filteredData의 데이터를 변경합니다.
    const searchTextRegex = new RegExp(
      searchTextValue.replace(/[\s']/g, ""),
      "i",
    );
    const fd = data?.filter((character) =>
      searchTextRegex.test(character.name.replace(/[\s']/g, "")),
    );
    setFilteredData(fd ?? []);
  }, [searchTextValue, data]);

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
        {(searchTextValue ? filteredData : data)
          .slice(0, perPage)
          .map((character) => (
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
      <div
        className="mb-12 grid min-h-screen w-full max-w-[1800px] grid-cols-[repeat(auto-fill,minmax(360px,1fr))] justify-items-center gap-x-10 gap-y-6 p-6 sm:flex sm:flex-col sm:items-center"
        style={
          searchTextState && filteredData.length <= perPage
            ? { minHeight: "auto" }
            : {}
        }
      >
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
