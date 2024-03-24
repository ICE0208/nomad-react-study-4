import { IMovie } from "@/api";
import { Variants, motion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { useCardPerSlide } from "../hooks";
import { Card, SliderButton } from ".";
import { Link } from "react-router-dom";

interface SliderProps {
  title: string;
  datas: IMovie[];
  linkTo: string;
}

const movePercent = {
  5: 83.33333333,
  4: 80,
  3: 75,
  2: 66,
  1: 50,
};

const cardPerSlide2WidthPerCard = {
  5: "w-1/6",
  4: "w-[20%]",
  3: "w-[25%]",
  2: "w-[33%]",
  1: "w-[50%]",
};

export const SLIDER_ANIMATION_DURATION = 0.6;

export default function SliderArea({ title, datas, linkTo }: SliderProps) {
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
          setStart((prev) => (prev + cardPerSlide) % datas.length);
        } else if (direction === -1) {
          setWasNext(false);
          setStart((prev) => {
            return (prev - cardPerSlide) % datas.length;
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
        opacity: 1,
        x: wN
          ? `${movePercent[cardPerSlide]}%`
          : `${movePercent[cardPerSlide] * -1}%`,
      }),
      animate: (wN: boolean) => ({
        opacity: 1,
        x: wN ? "0%" : "0%",
        // transition: { duration: 0 },
      }),
    }),
    [cardPerSlide],
  );

  const firstRender = useRef(true);

  return (
    <div className="">
      <div>
        <h3 className="absolute z-10 ml-5 select-none font-serif text-3xl font-medium">
          <Link to={linkTo}>{title}</Link>
        </h3>
      </div>
      <div className={"relative flex items-center"}>
        {datas.length === 0 ? (
          <div
            className={`relative ${cardPerSlide2WidthPerCard[cardPerSlide]} mb-8 px-1`}
          >
            <div className="aspect-[16/9] w-full"></div>
          </div>
        ) : (
          <div className="relative flex items-center ">
            <motion.div
              variants={variants}
              custom={wasNext}
              initial={firstRender.current ? "" : "initial"}
              animate="animate"
              onAnimationComplete={() => (firstRender.current = false)}
              transition={{
                duration: SLIDER_ANIMATION_DURATION,
                ease: "easeInOut",
                opacity: {
                  times: [0, 1, 1],
                  duration: SLIDER_ANIMATION_DURATION,
                },
              }}
              key={start}
              className="relative my-12 flex flex-nowrap justify-center overflow-visible"
            >
              {sortedDataWithStart.map((data) => {
                return (
                  <Card
                    key={data.title}
                    title={data.title}
                    backdropPath={data.backdrop_path}
                    id={data.id}
                    type={title}
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

            <div className="pointer-events-none absolute left-0 top-1/2 box-border h-[calc(100%-8rem)] w-full -translate-y-1/2 overflow-hidden">
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
