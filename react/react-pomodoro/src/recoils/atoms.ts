import { atom } from "recoil";

export const accumulatedTimeState = atom({
  key: "accumulatedTime",
  default: 0,
});
