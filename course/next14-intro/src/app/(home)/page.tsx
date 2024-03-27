import Movie from "@/components/movie";
import { Metadata } from "next";
import styles from "@/styles/home.module.css";
import { API_URL } from "../constants";

export const metadata: Metadata = {
  title: "Home",
};

async function getMovies() {
  // fetch는 한번만 요청되고, 그 다음부터는 캐싱된 데이터를 받습니다.
  return fetch(API_URL).then((response) => response.json());
}

export default async function HomePage() {
  const movies = await getMovies();

  return (
    <div className={styles.container}>
      {movies.map((movie: any) => (
        <Movie
          key={movie.id}
          id={movie.id}
          poster_path={movie.poster_path}
          title={movie.title}
        />
      ))}
    </div>
  );
}
