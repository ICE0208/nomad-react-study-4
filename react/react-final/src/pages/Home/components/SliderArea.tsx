import { IMovie, makeImagePath } from "@/api";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { useCardPerSlide } from "../hooks";

interface SliderProps {
  title: string;
  datas: IMovie[];
}

const cardPerSlide2WidthPerCard = {
  5: "w-1/6",
  4: "w-[20%]",
  3: "w-[25%]",
  2: "w-[33%]",
  1: "w-[50%]",
};

const cardPerSlide2Aspect = {
  5: "aspect-[7/1]",
  4: "aspect-[6/1]",
  3: "aspect-[5/1]",
  2: "aspect-[4/1]",
  1: "aspect-[3/1]",
};

const ANIMATION_DURATION = 0.6;

export default function SliderArea({ title, datas }: SliderProps) {
  const [start, setStart] = useState(0);
  const [wasNext, setWasNext] = useState(true);
  const isButtonDelay = useRef(false);

  const cardPerSlide = useCardPerSlide();

  const isNeedOneSpace = useMemo(() => {
    const n = datas.length + cardPerSlide;
    return n % 2 == 0 ? false : true;
  }, [datas, cardPerSlide]);

  const clearButtonDelay = useCallback(
    () => (isButtonDelay.current = false),
    [],
  );

  const handlePrev = () => {
    if (isButtonDelay.current) return;
    isButtonDelay.current = true;

    setWasNext(false);
    setStart((prev) => {
      return (prev - cardPerSlide - 1) % datas.length;
    });

    setTimeout(clearButtonDelay, ANIMATION_DURATION * 1000 + 100);
  };

  const handleNext = () => {
    if (isButtonDelay.current) return;
    isButtonDelay.current = true;

    setWasNext(true);
    setStart((prev) => (prev + cardPerSlide + 1) % datas.length);

    setTimeout(clearButtonDelay, ANIMATION_DURATION * 1000 + 100);
  };

  const myDatas = useMemo(
    () => [...datas.slice(start), ...datas.slice(0, start)],
    [start, datas],
  );

  const variants: Variants = useMemo(
    () => ({
      initial: (wN: boolean) => ({
        x: wN ? "100%" : "-100%",
      }),
      animate: (wN: boolean) => ({
        x: wN ? "0%" : "0%",
      }),
      exit: (wN: boolean) => ({
        x: wN ? "-100%" : "100%",
      }),
    }),
    [],
  );

  return (
    <div>
      <h3 className="mb-12">{title}</h3>
      <div className={"bg-red-300 " + cardPerSlide2Aspect[cardPerSlide]}>
        <AnimatePresence initial={false} custom={wasNext}>
          <motion.div
            variants={variants}
            custom={wasNext}
            initial="initial"
            animate="animate"
            exit="exit"
            // onAnimationComplete={clearButtonDelay}
            transition={{
              duration: ANIMATION_DURATION,
              ease: "easeInOut",
            }}
            key={start}
            className="absolute flex w-full flex-nowrap justify-center overflow-x-hidden"
          >
            {myDatas.map((data) => {
              return (
                <Card
                  key={data.title}
                  title={data.title}
                  backdropPath={data.backdrop_path}
                  className={
                    "flex flex-none flex-col items-start px-2 " +
                    cardPerSlide2WidthPerCard[cardPerSlide]
                  }
                />
              );
            })}
            {isNeedOneSpace && (
              <div
                key="space"
                className={
                  "flex-none " + cardPerSlide2WidthPerCard[cardPerSlide]
                }
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-[300px]">
        <button onClick={handlePrev}>prev</button>
        <button onClick={handleNext}>next</button>
      </div>
    </div>
  );
}

const Card = ({
  backdropPath,
  title,
  className = "",
}: {
  backdropPath: string;
  title: string;
  className?: string;
}) => (
  <div className={className}>
    <img src={makeImagePath(backdropPath)} alt={title} />
    <span className="w-full text-ellipsis text-nowrap">{title}</span>
  </div>
);
