import { useRecoilValue } from "recoil";
import { useTimer } from "./hooks";
import { roundGoalState } from "./recoils";
import { useMemo } from "react";
import { MAX_GOAL, MAX_ROUND } from "./constants";
import { TimeCard, TogglePlayButton } from "./components";

function App() {
  const { remainingMin, remainingSec, toggleTimer, isPlayingTimer } =
    useTimer();
  const roundGoal = useRecoilValue(roundGoalState);
  const { round, goal } = useMemo(() => roundGoal, [roundGoal]);

  return (
    <div className="flex h-full flex-col items-center justify-between p-2">
      {/* Title */}
      <div className="flex grow-[2] items-center text-[32px] font-bold">
        <span>Pomodoro</span>
      </div>
      {/* Time */}
      <div className="flex grow-[4] items-center justify-center gap-1 text-center text-[64px] font-medium">
        <TimeCard value={remainingMin} />
        <span>:</span>
        <TimeCard value={remainingSec} />
      </div>
      {/* Button */}
      <TogglePlayButton onClick={toggleTimer} isPlayingTimer={isPlayingTimer} />
      {/* Status */}
      <div className="flex w-full grow-[2] items-center justify-center gap-14">
        {/* Left Status */}
        <div className="flex w-[66px] flex-col items-center font-semibold">
          <span className="font-light">
            {round}/{MAX_ROUND}
          </span>
          <span>ROUND</span>
        </div>
        {/* Right Status */}
        <div className="flex w-[66px] flex-col items-center font-semibold">
          <span className="font-light">
            {goal}/{MAX_GOAL}
          </span>
          <span>GOAL</span>
        </div>
      </div>
    </div>
  );
}

export default App;
