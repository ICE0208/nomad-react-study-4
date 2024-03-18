import { accumulatedTimeState } from "@/recoils";
import { motion } from "framer-motion";
import { useResetRecoilState } from "recoil";

export default function ResetButton() {
  const resetTimer = useResetRecoilState(accumulatedTimeState);

  return (
    <motion.div
      whileHover={{ scale: 1.3, rotateZ: 135 }}
      whileTap={{ scale: 0.9, rotateZ: 270 }}
      transition={{
        scale: { type: "spring", stiffness: 300, velocity: 5 },
        rotateZ: { type: "spring", duration: 0.8 },
      }}
      onClick={() => resetTimer()}
    >
      <ResetSVG />
    </motion.div>
  );
}

const ResetSVG = () => (
  <svg viewBox="0 0 512 512" fill="currentColor" className="h-6 w-6">
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeWidth={50}
      d="M320 146s24.36-12-64-12a160 160 0 10160 160"
    />
    <path
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={50}
      d="M256 58l80 80-80 80"
    />
  </svg>
);
