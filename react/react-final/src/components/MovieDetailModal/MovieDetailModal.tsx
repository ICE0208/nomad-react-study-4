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
    <div className="fixed top-0 flex h-full w-full items-center justify-center bg-[#0000006f]">
      <div
        className="absolute left-0 top-0 -z-10 flex h-full w-full items-center justify-center px-24 pt-16"
        onClick={() => navigate(-1)}
      >
        <motion.div
          layoutId={id}
          className={[
            "w-[800px] overflow-hidden rounded-2xl bg-[#000000d8]",
            "aspect-[12/16] md:aspect-[24/18]",
          ].join(" ")}
        >
          {data && <ModalContent data={data} />}
        </motion.div>
      </div>
    </div>
  );
}
