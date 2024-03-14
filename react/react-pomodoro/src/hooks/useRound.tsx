import { MAX_GOAL, MAX_ROUND } from "@/constants";
import { roundGoalState } from "@/recoils";
import { useCallback, useEffect, useMemo } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";

export default function useManageRoundGoal() {
  const [state, setState] = useRecoilState(roundGoalState);
  const resetState = useResetRecoilState(roundGoalState);
  const { round, goal } = useMemo(() => state, [state]);

  useEffect(() => {
    if (goal === MAX_GOAL) {
      resetState();
    }
  }, [goal, resetState]);

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
