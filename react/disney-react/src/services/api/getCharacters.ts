import { Character } from "@/types";
import { getCharactersApiUrl } from "./apiUtils";

export default async function getCharacters() {
  const response = await fetch(getCharactersApiUrl());
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  // API 응답의 JSON 본문을 ApiResponse<Character[]> 타입으로 파싱합니다.
  const result: Character[] = await response.json();

  return result;
}
