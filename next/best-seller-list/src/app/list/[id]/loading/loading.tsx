import styles from "../genreList.module.scss";

export default function GenreListLoading() {
  return (
    <div className={styles.container}>
      <h1 className={styles.bookTitle}>Loading...</h1>
      <p>Loading...</p>
    </div>
  );
}
