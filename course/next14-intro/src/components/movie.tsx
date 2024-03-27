"use client";

/* eslint-disable @next/next/no-img-element */
import styles from "@/styles/movie.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface IMovieProps {
  title: string;
  id: string;
  poster_path: string;
}
export default function Movie({ title, id, poster_path }: IMovieProps) {
  const router = useRouter();
  const onClick = () => {
    router.push(`/movies/${id}`);
  };

  return (
    <div className={styles.movie}>
      <img
        onClick={onClick}
        src={poster_path}
        alt={title}
      />
      <Link href={`/movies/${id}`}>{title}</Link>
    </div>
  );
}
