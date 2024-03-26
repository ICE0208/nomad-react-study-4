import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  // fetch는 한번만 요청되고, 그 다음부터는 캐싱된 데이터를 받습니다.
  return fetch(API_URL).then((response) => response.json());
}

export default async function HomePage() {
  const movies = await getMovies();

  return (
    <div>
      {movies.map((movie: any) => (
        <li key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </div>
  );
}
