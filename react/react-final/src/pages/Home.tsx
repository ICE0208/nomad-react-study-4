import { IMovieDetail } from "@/api";
import { UseQueryResult } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";

export default function Home() {
  const { results } = useOutletContext() as {
    results: UseQueryResult<IMovieDetail[], Error>;
  };

  console.log(results);

  return <h1>Home</h1>;
}
