import { Book } from "@/api/types";
import styles from "./BookCard.module.scss";
import BuyButton from "./BuyButton";

interface BookCardProps {
  bookInfo: Book;
}

export default function BookCard({ bookInfo }: BookCardProps) {
  return (
    <div className={styles.container}>
      <div
        className={styles.imageDiv}
        style={{ backgroundImage: `url(${bookInfo.book_image})` }}
      />
      <div className={styles.infoDiv}>
        <div className={styles.textArea}>
          <p className={styles.title}>{bookInfo.title}</p>
          <p className={styles.author}>{bookInfo.author}</p>
        </div>
        <BuyButton href={bookInfo.buy_links[0].url} />
      </div>
    </div>
  );
}
