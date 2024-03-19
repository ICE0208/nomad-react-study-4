import { IMovie, makeImagePath } from "@/api";
import { AnimatePresence, Variants, motion, useAnimate } from "framer-motion";
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
        <h3 className="absolute mb-4 ml-5 font-serif text-3xl font-medium">
          {title}
        </h3>
      </div>
      <div className={"relative mt-6 flex h-auto w-full items-center"}>
        {datas.length === 0 ? (
          <div
            className={`relative ${cardPerSlide2WidthPerCard[cardPerSlide]} mb-8 px-1`}
          >
            <div className="aspect-[16/9] w-full"></div>
          </div>
        ) : (
          <div className="relative flex items-center">
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
                className="relative flex flex-nowrap justify-center py-4"
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

            <div className="pointer-events-none absolute left-0 top-1/2 box-border h-[calc(100%-4rem)] w-full -translate-y-1/2 overflow-hidden">
              <SliderButton
                direction="left"
                className={`pointer-events-auto absolute left-0 top-1/2 -translate-y-1/2`}
                onClick={() => handleSlide({ direction: -1 })}
              />
              <SliderButton
                direction="right"
                className={`pointer-events-auto absolute right-0 top-1/2 -translate-y-1/2`}
                onClick={() => handleSlide({ direction: 1 })}
              />
            </div>
          </div>
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
}) => {
  const [scope, animate] = useAnimate();
  const setTimeoutRef = useRef<NodeJS.Timeout>();

  const onHover = () => {
    clearTimeout(setTimeoutRef.current);
    setTimeoutRef.current = setTimeout(() => {
      animate(scope.current, { zIndex: 500 });
      animate(".card-text", { opacity: 0 });
      animate(".hover-text", { opacity: 1 });
    }, 300);
  };
  const onHoverEnd = () => {
    clearTimeout(setTimeoutRef.current);
    setTimeoutRef.current = setTimeout(() => {
      animate(scope.current, { zIndex: "auto" });
    }, 300);
    animate(".card-text", { opacity: 1 });
    animate(".hover-text", { opacity: 0 });
  };

  return (
    <div className={`${className} overflow-visible`} ref={scope}>
      <div className="relative my-4 overflow-visible">
        <motion.div
          className="cursor-pointer rounded-md"
          whileHover={{ scale: 1.3, transition: { delay: 0.3 } }}
          onHoverStart={onHover}
          onHoverEnd={onHoverEnd}
        >
          <img
            src={makeImagePath(backdropPath)}
            alt={title}
            className="aspect-[16/9]"
          />
          <span
            className={[
              "pointer-events-none absolute left-4 top-3 w-1/2 overflow-visible text-pretty font-serif font-bold opacity-0",
              "shadow-black [text-shadow:1px_1px_2px_var(--tw-shadow-color)]",
              "text-md sm:text-xl md:text-2xl",
              "hover-text",
            ].join(" ")}
          >
            <>{title}</>
          </span>
        </motion.div>
        <div
          className={[
            "absolute -bottom-8 left-0 text-ellipsis text-nowrap font-serif",
            "card-text",
          ].join(" ")}
        >
          {title}
        </div>
      </div>
    </div>
  );
};
