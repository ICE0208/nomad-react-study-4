import { getMovie } from "@/api";
import { useBlockBodyScroll } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ModalContent from "./ModalContent";

export default function MovieDetailModal() {
  useBlockBodyScroll();
  const state = useLocation().state as { prev: boolean } | undefined;
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (state?.prev === undefined) {
      navigate("/", { replace: true });
    }
  }, [navigate, state]);

  const { data } = useQuery({
    queryKey: ["movie", "detail", id ?? "x"],
    queryFn: () => getMovie(id ?? "x"),
  });
  return (
    <div className="fixed top-0 flex h-full w-full items-center justify-center pt-16">
      <div
        className="absolute left-0 top-0 -z-10 h-full w-[110vw] bg-[#0000006f]"
        onClick={() => navigate(-1)}
      ></div>
      <motion.div
        layoutId={id}
        className={[
          "min-h-[700px] w-[1000px] min-w-[350px] overflow-auto overflow-x-hidden rounded-2xl bg-[#171717]",
          "aspect-[12/14] md:aspect-[24/18]",
          "mx-8 md:mx-12",
          "scrollbar-track-slate-900 scrollbar-thumb-slate-500 scrollbar-thin",
        ].join(" ")}
      >
        {data && <ModalContent data={data} />}
      </motion.div>
    </div>
  );
}
