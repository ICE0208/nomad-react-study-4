import styles from "../genreList.module.scss";
import BookCardSkeleton from "./components/BookCardSkeleton";

export default function GenreListLoading() {
  return (
    <div className={styles.container}>
      <h1 className={styles.bookTitle}>Loading...</h1>
      <div className={styles.booksSpreader}>
        {Array.from({ length: 9 }).map((_, i) => (
          <BookCardSkeleton key={i}></BookCardSkeleton>
        ))}
      </div>
    </div>
  );
}
