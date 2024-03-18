import { useRecoilValue } from "recoil";
import { useTimer } from "./hooks";
import { roundGoalState } from "./recoils";
import { useMemo } from "react";
import { MAX_GOAL, MAX_MINUTES, MAX_ROUND } from "./constants";
import {
  ResetButton,
  StatusDisplay,
  TimeCard,
  TogglePlayButton,
} from "./components";
import Colon from "./components/Colon";

function App() {
  const { remainingMin, remainingSec, toggleTimer, isPlayingTimer } =
    useTimer();
  const roundGoal = useRecoilValue(roundGoalState);
  const { round, goal } = useMemo(() => roundGoal, [roundGoal]);

  return (
    <div className="flex h-full select-none flex-col items-center justify-between p-2">
      {/* Title */}
      <div className="flex grow-[2] items-center text-[52px] font-bold">
        <span>Pomodoro</span>
      </div>

      {/* Time */}
      <div className="flex grow-[4] items-center justify-center gap-4 text-center text-[72px] font-semibold">
        {/* Minute Time */}
        <TimeCard value={remainingMin} />
        <Colon
          key={`${remainingMin}-${remainingSec}-${isPlayingTimer}`}
          isPlayingTimer={isPlayingTimer}
        />
        {/* Second Time */}
        <TimeCard value={remainingSec} />
      </div>

      {/* Button Area */}
      <div className="relative flex grow-[3] items-center justify-center">
        {/* Play/Pause Button */}
        <TogglePlayButton
          onClick={toggleTimer}
          isPlayingTimer={isPlayingTimer}
        />

        {/* Timer Reset Button */}
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
          {isPlayingTimer || +remainingMin === MAX_MINUTES ? null : (
            <ResetButton />
          )}
        </span>
      </div>

      {/* Status */}
      <div className="flex w-full grow-[2] items-center justify-center gap-20 text-2xl">
        {/* Left Status (ROUND) */}
        <StatusDisplay
          statusType="ROUND"
          statusValue={round}
          statusMaxValue={MAX_ROUND}
        />
        {/* Right Status (GOAL) */}
        <StatusDisplay
          statusType="GOAL"
          statusValue={goal}
          statusMaxValue={MAX_GOAL}
        />
      </div>
    </div>
  );
}

export default App;
