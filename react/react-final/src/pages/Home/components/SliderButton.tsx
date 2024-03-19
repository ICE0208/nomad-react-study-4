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
        backgroundColor: "rgba(0, 0, 0, 0.85)",
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
        `flex h-full w-10 cursor-pointer items-center justify-center bg-[#000000d2] text-white shadow-2xl`,
        `${direction === "left" ? "rounded-r-3xl" : "rounded-l-3xl"}`,
      ].join(" ")}
    >
      <span
        className="absolute"
        style={
          direction === "right"
            ? { transform: "rotateZ(180deg)", right: "6px" }
            : { left: "8px" }
        }
      >
        <LeftSVG />
      </span>
    </motion.div>
  );
}

const LeftSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.4}
    stroke="currentColor"
    className="h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5 8.25 12l7.5-7.5"
    />
  </svg>
);
