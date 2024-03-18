import {
  accumulatedTimeState,
  formattedRemainingMinSecState,
  remainingTimeState,
} from "@/recoils";
import { useCallback, useEffect, useReducer } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useManageRoundGoal } from ".";

interface timerActionType {
  type: "TOGGLE" | "PLAY" | "PAUSE";
}

function timerReducer(state: boolean, action: timerActionType) {
  switch (action.type) {
    case "TOGGLE":
      return !state;
    case "PLAY":
      return true;
    case "PAUSE":
      return false;
    default:
      return state;
  }
}

/** 전역 타이머를 다룰 수 있는 훅입니다. */
export default function useTimer() {
  const [isPlayingTimer, dispatchTimer] = useReducer(timerReducer, false);
  const setTime = useSetRecoilState(accumulatedTimeState);
  const [remainingMin, remainingSec] = useRecoilValue(
    formattedRemainingMinSecState,
  );
  const remainingTime = useRecoilValue(remainingTimeState);
  const { increaseRound } = useManageRoundGoal();

  useEffect(() => {
    // 남은 타이머의 시간이 0에 도달하면 다음 동작을 진행합니다.
    if (remainingTime <= 0) {
      // ROUND를 1 증가시킵니다.
      increaseRound();
      // 타이머를 정지시킵니다.
      dispatchTimer({ type: "PAUSE" });
      // 타이머를 리셋시킵니다.
      setTime(0);
    }
  }, [remainingTime, setTime, increaseRound]);

  useEffect(() => {
    // 플레이 상태가 아닐 때 리턴
    if (!isPlayingTimer) return;

    // --------------------

    // 1초마다 시간 1 증가
    const id = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    // 리렌더링 시 기존 interval을 clear
    return () => clearInterval(id);
  }, [setTime, isPlayingTimer]);

  // 타이머를 toggle 시킬 수 있는 함수
  const toggleTimer = useCallback(() => {
    return dispatchTimer({ type: "TOGGLE" });
  }, []);

  return { remainingMin, remainingSec, toggleTimer, isPlayingTimer };
}
