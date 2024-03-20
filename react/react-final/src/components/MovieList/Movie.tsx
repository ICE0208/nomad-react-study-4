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
        layoutId={data.id + ""}
        whileHover={{ scale: 1.1 }}
        style={{ backgroundImage: `url(${makeImagePath(data.poster_path)})` }}
        className="aspect-[1/1.5] w-full origin-bottom overflow-visible rounded-3xl bg-cover"
        onClick={handleImageClick}
      ></motion.div>
      <p className="min-h-[60px] text-xl">{data.title}</p>
    </div>
  );
}
