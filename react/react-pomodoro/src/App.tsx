import { useTimer } from "./hooks";

function App() {
  const { remainingMin, remainingSec } = useTimer();
  return (
    <div className="flex h-full flex-col items-center justify-between p-2">
      {/* Title */}
      <div className="flex grow-[2] items-center text-[32px] font-bold">
        <span>Pomodoro</span>
      </div>
      {/* Time */}
      <div className="flex grow-[4] items-center justify-center gap-1 text-center text-[64px] font-medium">
        <span className="flex h-[150px] w-[110px] items-center justify-center rounded-2xl bg-white px-4 py-6 text-[tomato]">
          {remainingMin}
        </span>
        <span>:</span>
        <span className="flex h-[150px] w-[110px] items-center justify-center rounded-2xl bg-white px-4 py-6 text-[tomato]">
          {remainingSec}
        </span>
      </div>
      {/* Button */}
      <div className="flex grow-[3] items-center justify-center">
        <span className="rounded-full bg-[#00000043] p-4">
          <PlaySVG />
        </span>
      </div>
      {/* Status */}
      <div className="flex w-full grow-[2] items-center justify-center gap-14">
        {/* Left Status */}
        <div className="flex w-[66px] flex-col items-center font-semibold">
          <span className="font-light">0/4</span>
          <span>ROUND</span>
        </div>
        {/* Right Status */}
        <div className="flex w-[66px] flex-col items-center font-semibold">
          <span className="font-light">0/12</span>
          <span>GOAL</span>
        </div>
      </div>
    </div>
  );
}

export default App;

const PlaySVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-8 w-8"
  >
    <path
      fillRule="evenodd"
      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
      clipRule="evenodd"
    />
  </svg>
);
