import { atom } from "recoil";

export const accumulatedTimeState = atom({
  key: "accumulatedTime",
  default: 0,
});

export const roundGoalState = atom({
  key: "roundGoal",
  default: {
    round: 0,
    goal: 0,
  },
});
