"use client";

import styles from "./GenreBox.module.scss";
import { useRouter } from "next/navigation";

interface GenreBoxProps {
  genreName: string;
  genreCode: string;
}

export default function GenreBox({ genreName, genreCode }: GenreBoxProps) {
  const router = useRouter();

  return (
    <div
      className={styles.container}
      onClick={() => router.push(`list/${genreCode}/loading`)}
    >
      {genreName}
    </div>
  );
}
