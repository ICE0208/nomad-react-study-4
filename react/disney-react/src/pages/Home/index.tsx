import { useQuery } from "@tanstack/react-query";
import getCharacters from "@/services/api/getCharacters";
import { CharacterCard } from "./components";

export default function Home() {
  const { data, isLoading, isError, error } = useQuery({
    queryFn: getCharacters,
    queryKey: ["characters"],
  });

  let content = <h1>?</h1>;

  if (isLoading) {
    content = <h1>Loading..</h1>;
  }

  if (isError) {
    content = <h1>Something is wrong. {error.message || ""}</h1>;
  }

  if (data) {
    content = (
      <>
        {data.slice(2, 30).map((character) => (
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
