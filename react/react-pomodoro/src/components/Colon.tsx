import { motion } from "framer-motion";

export default function Colon({ isPlayingTimer }: { isPlayingTimer: boolean }) {
  return (
    // 플레이 중인 상태에서만 애니메이션이 동작하도록 하였습니다.
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
