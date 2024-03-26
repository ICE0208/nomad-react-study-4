import { IMovie, makeImagePath } from "@/api";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface MovieProps {
  data: IMovie;
  basePath: string | undefined;
}

export default function Movie({ data, basePath }: MovieProps) {
  const navigate = useNavigate();

  const handleImageClick = () => {
    if (!basePath) {
      console.error("Base Path is undefined!");
      return;
    }
    navigate(`${basePath}/${data.id}`, { state: { prev: true } });
  };

  return (
    <div className="flex cursor-pointer flex-col items-center space-y-2 overflow-visible">
      <motion.div
        className="aspect-[1/1.5] w-full max-w-[250px] origin-bottom rounded-3xl bg-[#1b1b1b]"
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          layoutId={data.id + ""}
          style={{ backgroundImage: `url(${makeImagePath(data.poster_path)})` }}
          className="h-full w-full rounded-3xl bg-cover"
          onClick={handleImageClick}
        ></motion.div>
      </motion.div>
      <p className="min-h-[60px] text-xl">{data.title}</p>
    </div>
  );
}
