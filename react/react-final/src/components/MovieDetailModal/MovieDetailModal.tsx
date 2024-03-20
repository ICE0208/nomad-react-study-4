import { useBlockBodyScroll } from "@/hooks";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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

  return (
    <div className="fixed top-0 flex h-full w-full items-center justify-center bg-[#0000006f]">
      <div
        className="absolute top-0 -z-10 h-full w-full"
        onClick={() => navigate(-1)}
      ></div>
      <motion.div
        layoutId={id}
        className="h-[500px] w-[800px] rounded-2xl bg-[#000000be]"
      ></motion.div>
    </div>
  );
}
