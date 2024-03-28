import { getBookListWithGenre } from "@/api/request";
import styles from "./genreList.module.scss";
import BookCard from "./components/BookCard";

interface ParamsProps {
  id: string;
}

interface GenreListPageProps {
  params: ParamsProps;
}

export const generateMetadata = async ({ params }: GenreListPageProps) => {
  const { id: genreCode } = params;
  const bookList = await getBookListWithGenre(genreCode);
  return {
    title: bookList?.display_name,
  };
};

export default async function GenreListPage({ params }: GenreListPageProps) {
  const { id: genreCode } = params;
  const bookList = await getBookListWithGenre(genreCode);

  return (
    <div className={styles.container}>
      <h1 className={styles.bookTitle}>{bookList?.display_name}</h1>
      <div className={styles.booksSpreader}>
        {bookList?.books.map((bookInfo) => (
          <BookCard
            key={bookInfo.primary_isbn10}
            bookInfo={bookInfo}
          ></BookCard>
        ))}
      </div>
    </div>
  );
}
