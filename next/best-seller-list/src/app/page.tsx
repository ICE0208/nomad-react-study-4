import { getBookGenreList, getBookListWithGenre } from "@/api/request";
import styles from "./home.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const genreList = await getBookGenreList();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The New York Times Best Seiler Explorer</h1>
      <div className={styles.genresSpreader}>
        {genreList.map((genreInfo) => (
          <div key={genreInfo.list_name_encoded}>{genreInfo.display_name}</div>
        ))}
      </div>
    </div>
  );
}
