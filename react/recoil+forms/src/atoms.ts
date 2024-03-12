import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface I데이터 {
  가고싶은: string[];
  가본: string[];
  좋아하는: string[];
}
const { persistAtom } = recoilPersist();

export const 데이터Atom = atom<I데이터>({
  key: "데이터",
  default: {
    가고싶은: [],
    가본: [],
    좋아하는: [],
  },
  effects_UNSTABLE: [persistAtom],
});
