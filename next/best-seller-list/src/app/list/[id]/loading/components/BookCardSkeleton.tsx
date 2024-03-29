import styles from "./BookCardSkeleton.module.scss";
import BuyButton from "../../components/BuyButton";

export default function BookCardSkeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.imageDiv} />
      <div className={styles.infoDiv}>
        <div className={styles.textArea}>
          <div className={styles.title}></div>
          <div className={styles.author}></div>
        </div>
        <BuyButton
          disabled
          href=""
        />
      </div>
    </div>
  );
}
