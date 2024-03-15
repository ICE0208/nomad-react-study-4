import { motion } from "framer-motion";

interface ButtonProps {
  onClick: () => void;
  isPlayingTimer: boolean;
}

export default function TogglePlayButton({
  onClick,
  isPlayingTimer,
}: ButtonProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      transition={{ scale: { type: "spring", stiffness: 500 }, type: "tween" }}
      whileTap={{ scale: 0.9, transition: { type: "tween", duration: 0.1 } }}
      className="flex items-center justify-center"
      onClick={onClick}
    >
      <span className="rounded-full bg-[#0000006d] p-8">
        {isPlayingTimer ? <PauseSVG /> : <PlaySVG />}
      </span>
    </motion.div>
  );
}
const SVG_SIZE_CLASS = "h-10 w-10";

const PlaySVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={SVG_SIZE_CLASS}
  >
    <path
      fillRule="evenodd"
      d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
      clipRule="evenodd"
    />
  </svg>
);

const PauseSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={SVG_SIZE_CLASS}
  >
    <path
      fillRule="evenodd"
      d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
      clipRule="evenodd"
    />
  </svg>
);
