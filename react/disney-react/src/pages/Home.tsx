import { useQuery } from "@tanstack/react-query";
import getCharacters from "@/services/api/getCharacters";

export default function App() {
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
      <ul>
        {data.map((character) => (
          <li key={character.id}>{character.name}</li>
        ))}
      </ul>
    );
  }

  return <div className="flex justify-center items-center">{content}</div>;
}
