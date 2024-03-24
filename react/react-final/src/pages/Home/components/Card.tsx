import { makeImagePath } from "@/api";
import { motion, useAnimate } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

interface CardProps {
  backdropPath: string;
  title: string;
  className?: string;
  id: number;
  type: string;
}

export default function Card({
  backdropPath,
  title,
  className = "",
  id,
  type,
}: CardProps) {
  const [scope, animate] = useAnimate();
  const setTimeoutRef = useRef<NodeJS.Timeout>();

  const onHover = () => {
    clearTimeout(setTimeoutRef.current);
    setTimeoutRef.current = setTimeout(() => {
      animate(scope.current, { zIndex: 500 });
      animate(".card-text", { opacity: 0 }, { duration: 0.1 });
      animate(".hover-text", { opacity: 1 });
    }, 300);
  };
  const onHoverEnd = () => {
    clearTimeout(setTimeoutRef.current);
    setTimeoutRef.current = setTimeout(() => {
      animate(scope.current, { zIndex: "auto" });
    }, 300);
    animate(".card-text", { opacity: 1 });
    animate(".hover-text", { opacity: 0 });
  };

  const navigate = useNavigate();

  const handleImageClick = () => {
    navigate(`/${id}?type=${type}`, { state: { prev: true } });
  };

  return (
    <div className={`${className} overflow-visible`} ref={scope}>
      <div className="relative my-4 overflow-visible ">
        <motion.div
          className="cursor-pointer rounded-md"
          whileHover={{ scale: 1.4, transition: { delay: 0.3 } }}
          onHoverStart={onHover}
          onHoverEnd={onHoverEnd}
          onClick={handleImageClick}
          layoutId={`${id}-${type}`}
        >
          <img
            src={makeImagePath(backdropPath)}
            alt={title}
            className="aspect-[16/9] rounded-md"
          />
          <span
            className={[
              "pointer-events-none absolute left-4 top-3 w-1/2 overflow-visible text-pretty font-serif font-bold opacity-0",
              "shadow-black [text-shadow:1px_1px_2px_var(--tw-shadow-color)]",
              "text-md sm:text-lg md:text-xl",
              "hover-text",
            ].join(" ")}
          >
            <>{title}</>
          </span>
        </motion.div>
        <div
          className={[
            "absolute -bottom-1 left-0 w-full translate-y-full text-pretty font-serif",
            "text-md sm:text-lg md:text-xl",
            "card-text",
          ].join(" ")}
        >
          {title}
        </div>
      </div>
    </div>
  );
}
