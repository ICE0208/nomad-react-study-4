import { atom } from "recoil";

/** 누적된 시간을 세는 값입니다. 단위는 '초' 입니다. */
export const accumulatedTimeState = atom({
  key: "accumulatedTime",
  default: 0,
});

/** Round와 Goal의 값입니다. */
export const roundGoalState = atom({
  key: "roundGoal",
  default: {
    round: 0,
    goal: 0,
  },
});
