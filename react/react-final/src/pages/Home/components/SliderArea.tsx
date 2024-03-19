import { IMovie, makeImagePath } from "@/api";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { useCardPerSlide } from "../hooks";
import { SliderButton } from ".";

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

export const SLIDER_ANIMATION_DURATION = 0.6;

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

  const handleSlide = useMemo(
    () =>
      ({ direction }: { direction: 1 | -1 }) => {
        if (isButtonDelay.current) return;
        isButtonDelay.current = true;

        if (direction === 1) {
          setWasNext(true);
          setStart((prev) => (prev + cardPerSlide + 1) % datas.length);
        } else if (direction === -1) {
          setWasNext(false);
          setStart((prev) => {
            return (prev - cardPerSlide - 1) % datas.length;
          });
        }
        // 애니메이션 + 추가 여유시간을 주었습니다.
        // 추가 여유시간을 주지 않으면 가끔씩 버그가 발생합니다.
        setTimeout(clearButtonDelay, SLIDER_ANIMATION_DURATION * 1000 + 100);
      },
    [cardPerSlide, clearButtonDelay, datas],
  );

  const sortedDataWithStart = [...datas.slice(start), ...datas.slice(0, start)];

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
      <div>
        <h3 className="mb-4 ml-5 font-serif text-3xl font-medium">{title}</h3>
      </div>
      <div className={"relative flex h-auto w-full items-center"}>
        {datas.length === 0 ? (
          <div
            className={`relative ${cardPerSlide2WidthPerCard[cardPerSlide]} mb-8 px-1`}
          >
            <div className="aspect-[16/9] w-full"></div>
          </div>
        ) : (
          <>
            <AnimatePresence initial={false} custom={wasNext} mode="popLayout">
              <motion.div
                variants={variants}
                custom={wasNext}
                initial="initial"
                animate="animate"
                exit="exit"
                // onAnimationComplete={clearButtonDelay}
                transition={{
                  duration: SLIDER_ANIMATION_DURATION,
                  ease: "easeInOut",
                }}
                key={start}
                className="relative flex flex-nowrap justify-center"
              >
                {sortedDataWithStart.map((data) => {
                  return (
                    <Card
                      key={data.title}
                      title={data.title}
                      backdropPath={data.backdrop_path}
                      className={
                        "flex flex-none flex-col items-start px-1 " +
                        cardPerSlide2WidthPerCard[cardPerSlide]
                      }
                    />
                  );
                })}

                {isNeedOneSpace && (
                  <div
                    key="space"
                    className={
                      "min-h-[50px] flex-none " +
                      cardPerSlide2WidthPerCard[cardPerSlide]
                    }
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute left-0 top-0 box-border h-[calc(100%-2rem)] w-full overflow-hidden">
              <SliderButton
                direction="left"
                className={`absolute left-0 top-1/2 -translate-y-1/2`}
                onClick={() => handleSlide({ direction: -1 })}
              />
              <SliderButton
                direction="right"
                className={`absolute right-0 top-1/2 -translate-y-1/2`}
                onClick={() => handleSlide({ direction: 1 })}
              />
            </div>
          </>
        )}
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
  <div className={`${className}`}>
    <div className="relative pb-8">
      <img
        src={makeImagePath(backdropPath)}
        alt={title}
        className="aspect-[16/9] rounded-md"
      />
      <div
        className={[
          "absolute -bottom-0 left-0 text-ellipsis text-nowrap font-serif",
          "",
        ].join(" ")}
      >
        {title}
      </div>
    </div>
  </div>
);
