import { useQuery } from "@tanstack/react-query";
import getCharacters from "@/services/api/getCharacters";
import { CharacterCard, CharacterCardSkeleton } from "./components";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getCharacters,
    queryKey: ["characters"],
  });

  let content = <h1>?</h1>;

  if (isLoading) {
    content = (
      <>
        {Array.from({ length: 12 }, (_, i) => i).map((_, i) => (
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
        {data.slice(2, 50).map((character) => (
          <CharacterCard
            key={character.id}
            imgUrl={character.imageUrl}
            name={character.name}
          />
        ))}
      </>
    );
  }

  return (
    <div className="mb-5 grid grid-cols-[repeat(auto-fill,minmax(400px,1fr))] justify-items-center gap-y-6 p-6">
      {content}
    </div>
  );
}
