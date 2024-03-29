import styles from "./home.module.scss";

export default function HomeLoading() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>The New York Times Best Seiler Explorer</h1>
      <div className={styles.genresSpreader}>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  );
}
