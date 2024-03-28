import { getBookGenreList, getBookListWithGenre } from "@/api/request";
import styles from "./home.module.scss";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  // ---------------------------------------
  // 이 아래부터는 api 호출 함수가 정상적으로 작동하는지
  // 테스트하기 위하여 작성된 코드입니다.
  // 다음 개발과정부터는 이 아래 코드를 전부 다 지우고
  // 개발을 진행하면 됩니다.
  // ---------------------------------------
  const genreList = await getBookGenreList();
  const bookList = await getBookListWithGenre(
    "combined-print-and-e-book-nonfiction"
  );

  return (
    <div>
      <h1>Home</h1>
      <div>
        <h2>Genre List</h2>
        {JSON.stringify(genreList)}
      </div>
      <div>
        <h2>{"Combined Print and E-Book Nonfiction's book list"}</h2>
        {JSON.stringify(bookList)}
      </div>
    </div>
  );
}
