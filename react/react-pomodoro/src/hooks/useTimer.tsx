import {
  accumulatedTimeState,
  formattedRemainingMinSecState,
  remainingTimeState,
} from "@/recoils";
import { useCallback, useEffect, useReducer } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

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

export default function useTimer() {
  const [isPlayingTimer, dispatchTimer] = useReducer(timerReducer, false);
  const setTime = useSetRecoilState(accumulatedTimeState);
  const [remainingMin, remainingSec] = useRecoilValue(
    formattedRemainingMinSecState,
  );
  const remainingTime = useRecoilValue(remainingTimeState);

  useEffect(() => {
    if (remainingTime <= 0) {
      // ROUND++

      // 타이머 정지
      dispatchTimer({ type: "PAUSE" });
      // 타이머 리셋
      setTime(0);
    }
  }, [remainingTime, setTime]);

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
