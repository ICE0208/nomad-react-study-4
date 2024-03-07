import { Character } from "@/types";
import { getCharactersApiUrl } from "./apiUtils";

export default async function getCharacters() {
  const response = await fetch(getCharactersApiUrl());
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result: Character[] = await response.json();

  return result;
}
