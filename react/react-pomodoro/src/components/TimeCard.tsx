import { Variants, motion } from "framer-motion";

interface TimeCardProps {
  value: string;
}
const variants: Variants = {
  initial: {
    opacity: 0.8,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
};

export default function TimeCard({ value }: TimeCardProps) {
  return (
    <motion.span
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{
        scale: { type: "spring", stiffness: 400, velocity: 3, damping: 20 },
      }}
      key={value}
      className="flex h-[260px] w-[180px] items-center justify-center rounded-2xl bg-white text-[tomato]"
    >
      {value}
    </motion.span>
  );
}
