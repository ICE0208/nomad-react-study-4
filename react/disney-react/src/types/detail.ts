import { Character } from ".";

export interface Detail extends Character {
  films: string[];
  sourceUrl: string;
}
