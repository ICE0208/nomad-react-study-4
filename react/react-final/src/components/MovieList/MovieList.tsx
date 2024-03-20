import { IMovie } from "@/api";
import Movie from "./Movie";
import { Variants, motion } from "framer-motion";

interface MoveListProps {
  datas: IMovie[];
}

export default function MovieList({ datas }: MoveListProps) {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.7 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.5,
        velocity: 5,
        duration: 1,
      },
    },
  };

  return (
    <>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className={[
          "grid w-full max-w-[900px] grid-cols-[repeat(auto-fit,minmax(180px,1fr))]",
          "justify-items-center gap-x-16 gap-y-12 overflow-visible",
        ].join(" ")}
      >
        {datas.map((data) => (
          <motion.span
            key={data.id}
            variants={item}
            className="overflow-visible"
          >
            <Movie data={data} />
          </motion.span>
        ))}
      </motion.div>
    </>
  );
}
