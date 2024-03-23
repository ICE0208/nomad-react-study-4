import { getMovie } from "@/api";
import { useBlockBodyScroll } from "@/hooks";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import ModalContent from "./ModalContent";

export default function MovieDetailModal() {
  useBlockBodyScroll();
  const state = useLocation().state as { prev: boolean } | undefined;
  const navigate = useNavigate();
  const { id } = useParams();

  // Home에서 선택했을 때 주어지는 쿼리 스트링 type입니다.
  // 각 슬라이드의 카드 애니메이션을 구분하기 위해 사용됩니다.
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

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
    <div className="fixed top-0 z-20 flex h-full w-full items-center justify-center pt-16">
      <div
        className="absolute left-0 top-0 -z-10 h-full w-[110vw] bg-[#0000006f]"
        onClick={() => navigate(-1)}
      ></div>
      <motion.div
        layoutId={`${id}` + (type ? `-${type}` : "")}
        className={[
          "overflow-auto overflow-x-hidden rounded-2xl bg-[#171717]",
          "aspect-[12/14] min-h-[420px] max-w-[940px] sm:h-[88%] md:aspect-[24/18] md:h-[92%]",
          "mx-8 md:mx-12",
          "scrollbar scrollbar-track-[#171717] scrollbar-thumb-slate-500",
        ].join(" ")}
      >
        {data && <ModalContent data={data} />}
      </motion.div>
    </div>
  );
}
