import { motion } from "framer-motion";

export default function Colon({ isPlayingTimer }: { isPlayingTimer: boolean }) {
  return (
    <motion.span
      animate={
        isPlayingTimer && {
          opacity: [1, 1, 0, 0, 1],
          transition: {
            duration: 1,
            times: [0, 0.7, 0.7, 1, 1],
          },
        }
      }
    >
      :
    </motion.span>
  );
}
