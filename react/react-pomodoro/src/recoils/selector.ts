import { MAX_MINUTES, SEC_OF_ONE_MINUTE } from "@/constants";
import { numberToStringFormatter } from "@/utils";
import { accumulatedTimeState } from ".";
import { selector } from "recoil";

export const remainingTimeState = selector({
  key: "remainingTime",
  get: ({ get }) => {
    const remainingTime = get(accumulatedTimeState);
    return MAX_MINUTES * SEC_OF_ONE_MINUTE - remainingTime;
  },
});

export const formattedRemainingMinSecState = selector({
  key: "minSec",
  get: ({ get }) => {
    const time = get(remainingTimeState);

    const remainingMinTime = Math.floor(time / SEC_OF_ONE_MINUTE);
    const remainingSecTime = time % SEC_OF_ONE_MINUTE;

    return [
      numberToStringFormatter(remainingMinTime),
      numberToStringFormatter(remainingSecTime),
    ];
  },
});
