import { IMovie, makeImagePath } from "@/api";
import { motion } from "framer-motion";

interface MovieProps {
  data: IMovie;
}

export default function Movie({ data }: MovieProps) {
  return (
    <div className="flex cursor-pointer flex-col items-center space-y-2 overflow-visible">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="origin-bottom overflow-hidden rounded-3xl"
      >
        <motion.img src={makeImagePath(data.poster_path)} />
      </motion.div>
      <p className="min-h-[60px] text-xl">{data.title}</p>
    </div>
  );
}
