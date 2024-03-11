import { atom } from "recoil";

interface I데이터 {
  가고싶은: string[];
  가본: string[];
  좋아하는: string[];
}

export const 데이터Atom = atom<I데이터>({
  key: "데이터",
  default: {
    가고싶은: [],
    가본: [],
    좋아하는: [],
  },
});
