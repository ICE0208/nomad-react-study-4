import { getBookGenreList, getBookListWithGenre } from "@/api/request";
import styles from "./home.module.scss";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import GenreBox from "./components/GenreBox";

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
          <GenreBox
            key={genreInfo.list_name_encoded}
            genreName={genreInfo.display_name}
            genreCode={genreInfo.list_name_encoded}
          />
        ))}
      </div>
    </div>
  );
}
