import {
  BookResponseResult,
  BookResponseRoot,
  GenreResponseResult,
  GenreResponseRoot,
} from "./types";

// url 관련 상수와 함수들 입니다.
const API_BASE_URL = "https://books-api.nomadcoders.workers.dev";
const BOOK_GENRE_LIST_URL = `${API_BASE_URL}/lists`;
const getUrlOfListWithGenre = (genre: string) =>
  `${API_BASE_URL}/list?name=${genre}`;

// 책의 장르 리스트를 가져옵니다.
export const getBookGenreList = async (): Promise<GenreResponseResult[]> => {
  try {
    const response = await fetch(BOOK_GENRE_LIST_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = (await response.json()) as GenreResponseRoot;
    return json.results;
  } catch (error) {
    console.error("Fetching book genre list failed:", error);
    return [];
  }
};

// 특정 장르의 책들의 리스트를 가져옵니다.
export const getBookListWithGenre = async (
  encodedGenreName: string
): Promise<BookResponseResult | null> => {
  try {
    const response = await fetch(getUrlOfListWithGenre(encodedGenreName));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = (await response.json()) as BookResponseRoot;
    return json.results;
  } catch (error) {
    console.error("Fetching book list with genre failed:", error);
    return null;
  }
};
