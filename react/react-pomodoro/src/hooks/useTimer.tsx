import { accumulatedTimeState, formattedRemainingMinSecState } from "@/recoils";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function useTimer() {
  const setTime = useSetRecoilState(accumulatedTimeState);
  const [remainingMin, remainingSec] = useRecoilValue(
    formattedRemainingMinSecState,
  );

  useEffect(() => {
    // 1초마다 시간 1 증가
    const id = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    // 리렌더링 시 기존 interval을 clear
    return () => clearInterval(id);
  }, [setTime]);

  return { remainingMin, remainingSec };
}
