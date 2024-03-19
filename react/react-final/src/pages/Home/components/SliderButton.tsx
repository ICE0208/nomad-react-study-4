import { motion } from "framer-motion";

interface SliderButtonProps {
  className?: string;
  direction: "left" | "right";
  onClick?: () => void;
}

export default function SliderButton({
  className = "",
  direction,
  onClick,
}: SliderButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, translateY: "-50%" }}
      animate={{
        opacity: 1,
        transition: { duration: 0.3 },
        translateY: "-50%",
      }}
      onClick={onClick}
      whileHover={{
        scaleX: 1.3,
        translateY: "-50%",
        backgroundColor: "rgba(0, 0, 0, 0.9)",
        borderRight: direction === "left" ? "1px solid white" : "0",
        borderLeft: direction === "right" ? "1px solid white" : "0",
      }}
      transition={{
        translateY: { duration: 0 },
        scaleX: { duration: 0.3 },
        borderRight: { duration: 0 },
        borderLeft: { duration: 0 },
      }}
      className={[
        `${className}`,
        `flex h-full w-10 cursor-pointer items-center justify-center bg-[#000000d1] text-white shadow-2xl`,
        `${direction === "left" ? "rounded-r-3xl" : "rounded-l-3xl"}`,
      ].join(" ")}
    >
      {direction === "left" ? <LeftSVG /> : <RightSVG />}
    </motion.div>
  );
}

const LeftSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      fillRule="evenodd"
      d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
      clipRule="evenodd"
    />
  </svg>
);

const RightSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path
      fillRule="evenodd"
      d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
      clipRule="evenodd"
    />
  </svg>
);
