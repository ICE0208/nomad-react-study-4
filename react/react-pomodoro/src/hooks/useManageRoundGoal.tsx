import { MAX_GOAL, MAX_ROUND } from "@/constants";
import { roundGoalState } from "@/recoils";
import { useCallback, useEffect, useMemo } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

/** 
Round와 Goal의 증가를 쉽게 다룰 수 있는 훅입니다.  
Round를 1 증가시킬 있는 함수를 반환합니다.  
Round를 1 증가시켰을 때, ROUND가 최대라면, GOAL을 1 증가시키고, ROUND를 0으로 설정합니다.
 */
export default function useManageRoundGoal() {
  const [state, setState] = useRecoilState(roundGoalState);
  const resetState = useResetRecoilState(roundGoalState);
  const { round, goal } = useMemo(() => state, [state]);

  // GOAL이 최대에 도달하면 ROUND와 GOAL 모두 초기화
  useEffect(() => {
    if (goal === MAX_GOAL) {
      resetState();
    }
  }, [goal, resetState]);

  // Round를 1 증가시켜주는 함수입니다.
  // Round가 최대일 때, Goal로 변환됩니다.
  const increaseRound = useCallback(() => {
    const nextRoundValue = round + 1;
    if (nextRoundValue === MAX_ROUND) {
      setState({ round: 0, goal: goal + 1 });
    } else {
      setState({ ...state, round: nextRoundValue });
    }
  }, [round, goal, setState, state]);

  return { increaseRound };
}
