import { IMovie, makeBgPath } from "@/api";
import { ChevronLeft, ChevronRight } from "@/icons";
import { AnimatePresence, Variants, motion } from "framer-motion";
import {
  PropsWithChildren,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const SLIDER_ANIMATION_DURATION = 0.5;

export default function HomeAd({ datas }: { datas: IMovie[] }) {
  const datasForAd = useMemo(() => datas.slice(0, 6), [datas]);

  const [adIndex, setAdIndex] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const isButtonDelay = useRef(false);

  const clearButtonDelay = useCallback(
    () => (isButtonDelay.current = false),
    [],
  );

  const moveAdIndex: (move: 1 | -1) => void = useCallback(
    (move) => {
      if (isButtonDelay.current) return;
      isButtonDelay.current = true;
      const maxLenOfData = datasForAd.length;
      setAdIndex(
        (prevIndex) => (prevIndex + move + maxLenOfData) % maxLenOfData,
      );

      setTimeout(clearButtonDelay, SLIDER_ANIMATION_DURATION * 1000 + 100);
    },
    [datasForAd, clearButtonDelay],
  );

  const imagePreLoad = useCallback(async () => {
    const loadImages = datasForAd.map(
      (data) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = makeBgPath(data.backdrop_path);
          img.onload = () => resolve(img);
          img.onerror = reject;
        }),
    );

    await Promise.all(loadImages);
    setImageLoaded(true);
  }, [datasForAd]);

  useLayoutEffect(() => {
    imagePreLoad();
  }, [imagePreLoad]);

  const variants: Variants = useMemo(
    () => ({
      initial: () => ({
        opacity: 0,
      }),
      animate: () => ({
        opacity: 1,
      }),
      exit: () => ({
        opacity: 0,
      }),
    }),
    [],
  );

  return (
    <div className="relative aspect-[12/5] w-full overflow-hidden">
      {imageLoaded && datasForAd.length > 0 ? (
        <>
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              className="h-full w-full bg-gray-800 bg-cover bg-center opacity-85"
              key={adIndex}
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: SLIDER_ANIMATION_DURATION }}
              style={{
                backgroundImage: `
                    linear-gradient(to bottom, #0000006e 0%, transparent 30%),
                    linear-gradient(to right, #0000006b 0%, transparent 20%),
                    linear-gradient(to left, #0000006b 0%, transparent 20%),
                      url(${makeBgPath(datas[adIndex].backdrop_path)})
                    `,
              }}
            ></motion.div>
          </AnimatePresence>
          <MoveAdIndexBtn
            onClick={() => moveAdIndex(-1)}
            className="absolute left-1 top-1/2 flex -translate-y-1/2 items-center justify-center"
          >
            <ChevronLeft />
          </MoveAdIndexBtn>
          <MoveAdIndexBtn
            onClick={() => moveAdIndex(1)}
            className="absolute right-1 top-1/2 flex -translate-y-1/2 items-center justify-center"
          >
            <ChevronRight />
          </MoveAdIndexBtn>
          <AdIndexDisplay
            curIndex={adIndex}
            dataLength={datasForAd.length}
            className="absolute bottom-0 right-0 pb-[4vw] pr-[3vw]"
          />
        </>
      ) : (
        <LoadingAd />
      )}
    </div>
  );
}

interface adIndexDisplayProps {
  curIndex: number;
  dataLength: number;
  className?: string;
}

const AdIndexDisplay = ({
  curIndex,
  dataLength,
  className = "",
}: adIndexDisplayProps) => {
  return (
    <div className={[className, "flex gap-2"].join(" ")}>
      {Array.from({ length: dataLength }).map((_, i) => (
        <div
          key={i}
          className={[
            "h-[1vw] w-[1vw] rounded-full bg-white",
            `${i === curIndex ? "opacity-95" : "opacity-40"}`,
          ].join(" ")}
        ></div>
      ))}
    </div>
  );
};
interface moveIndexBtnProps {
  onClick: () => void;
  className?: string;
}

const MoveAdIndexBtn = ({
  onClick,
  className = "",
  children,
}: PropsWithChildren<moveIndexBtnProps>) => (
  <div
    onClick={onClick}
    className={[className, "h-[50px] w-[50px] cursor-pointer"].join(" ")}
  >
    {children}
  </div>
);

const LoadingAd = () => (
  <div className="h-full w-full animate-pulse bg-gray-800"></div>
);
