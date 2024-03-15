import { MAX_MINUTES, SEC_OF_ONE_MINUTE } from "@/constants";
import { numberToStringFormatter } from "@/utils";
import { accumulatedTimeState } from ".";
import { selector } from "recoil";

/** 남은 시간을 반환하는 셀렉터입니다. */
export const remainingTimeState = selector({
  key: "remainingTime",
  get: ({ get }) => {
    const remainingTime = get(accumulatedTimeState);
    return MAX_MINUTES * SEC_OF_ONE_MINUTE - remainingTime;
  },
});

/** 남은 분과 초를 MM,SS 포맷에 맞추어 문자열로 반환하는 셀렉터입니다. */
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
