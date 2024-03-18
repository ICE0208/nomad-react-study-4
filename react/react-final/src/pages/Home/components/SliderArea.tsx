import { IMovie, makeImagePath } from "@/api";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useMemo, useRef, useState } from "react";

interface SliderProps {
  title: string;
  datas: IMovie[];
}

const ANIMATION_DURATION = 0.6;

export default function SliderArea({ title, datas }: SliderProps) {
  const [start, setStart] = useState(0);
  const [wasNext, setWasNext] = useState(true);
  const isButtonDelay = useRef(true);

  const handlePrev = () => {
    if (isButtonDelay.current) return;
    isButtonDelay.current = true;

    setWasNext(false);
    setStart((prev) => (prev - 5) % datas.length);
  };

  const handleNext = () => {
    if (isButtonDelay.current) return;
    isButtonDelay.current = true;

    setWasNext(true);
    setStart((prev) => (prev + 5) % datas.length);
  };

  const clearButtonDelay = () => (isButtonDelay.current = false);

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
      <AnimatePresence initial={false} custom={wasNext}>
        <motion.div
          variants={variants}
          custom={wasNext}
          initial="initial"
          animate="animate"
          exit="exit"
          onAnimationComplete={clearButtonDelay}
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
                className="flex w-[20%] flex-none flex-col items-start px-2"
              />
            );
          })}
        </motion.div>
      </AnimatePresence>
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
    <span>{title}</span>
  </div>
);
