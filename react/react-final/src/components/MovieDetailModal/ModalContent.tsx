import { IMovieDetail, getIMDBUrl, makeImagePath } from "@/api";
import { runtimeGetHour, runtimeGetMinute } from "@/utils/runtimeFormat";
import { VoteStarDisplay } from "..";
import { CalendarIcon, ClockIcon, GlobalIcon, XMarkIcon } from "@/icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useReducer, useRef, useState } from "react";

interface ModalContentProps {
  data: IMovieDetail;
}

const headerBg = "#27323d" as const;

const lineClamp = (isMore: boolean) => {
  return isMore ? "line-clamp-none" : "line-clamp-3";
};

export default function ModalContent({ data }: ModalContentProps) {
  const navigator = useNavigate();

  const [isMore, toggleIsMore] = useReducer((state) => !state, true);
  const [moreVisible, setMoreVisible] = useState(false);

  const handleOpenNewTab = (url: string) => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

  const overviewRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const spanHeight = overviewRef?.current?.clientHeight ?? 0;
    if (spanHeight > 72) {
      toggleIsMore();
      setMoreVisible(true);
    }

    return toggleIsMore;
  }, []);

  return (
    <>
      {/* header */}
      <div style={{ backgroundColor: headerBg }} className={`relative w-full`}>
        {/* [Absolute] Bg Image */}
        <div
          className={[
            "absolute right-0 z-10 aspect-[16/9] bg-cover bg-center opacity-40",
            "h-[400px] w-full md:w-[700px] md:max-w-full",
          ].join(" ")}
          style={{
            backgroundImage: `
            linear-gradient(to right, ${headerBg} 0%, transparent 10%),
            linear-gradient(to top, ${headerBg} 0%, transparent 10%),
              url(${makeImagePath(data.backdrop_path)})
            `,
          }}
        ></div>
        <div className="relative z-10 h-full w-full px-8 py-6 md:px-12 md:py-8">
          {/* buttons */}
          <div className="space-2 flex justify-end gap-2">
            <span
              className="cursor-pointer rounded-full bg-[#00000061] p-[6px]"
              onClick={() =>
                handleOpenNewTab(data.homepage || getIMDBUrl(data.imdb_id))
              }
            >
              <GlobalIcon />
            </span>
            <span
              className="cursor-pointer rounded-full bg-[#00000061] p-[6px]"
              onClick={() => navigator(-1)}
            >
              <XMarkIcon />
            </span>
          </div>
          {/* header contents */}
          <div className="mt-10 flex justify-between gap-32">
            {/* vote, title, ... */}
            <div>
              <h2 className="mb-[20px] text-[44px] font-semibold leading-[50px]">
                {data.title}
              </h2>
              <VoteStarDisplay vote={data.vote_average} />
              <div className="mb-[30px] mt-4 flex max-w-[260px] flex-wrap gap-2 text-[14px] font-semibold">
                {data.genres.map((genre) => {
                  return (
                    <div
                      className="rounded-md bg-slate-500 px-2 py-1"
                      key={genre.id}
                    >
                      {genre.name}
                    </div>
                  );
                })}
              </div>
              <span
                ref={overviewRef}
                className={[lineClamp(isMore), "max-w-[380px]"].join(" ")}
              >
                {data.overview}
              </span>
              {moreVisible && (
                <div
                  className="mt-2 flex cursor-pointer items-center gap-3"
                  onClick={toggleIsMore}
                >
                  <div className="rounded-md font-bold">
                    {isMore ? "Less" : "More"}
                  </div>
                  <div
                    style={{
                      transform: isMore ? "rotate(90deg)" : "rotate(-90deg)",
                    }}
                    className="text-[16px] font-extrabold"
                  >
                    {"〈"}
                  </div>
                </div>
              )}
            </div>
            {/* Images, Date.... */}
            <div className="hidden w-48 flex-none flex-col items-end md:flex">
              {/* Images */}
              <div
                style={{
                  backgroundImage: `url(${makeImagePath(data.poster_path)})`,
                }}
                className="mb-4 aspect-[9/13] w-full rounded-2xl bg-cover bg-center shadow-2xl"
              ></div>
              {/* Runtime */}
              <span className="mb-2 mr-4 inline-flex space-x-2 rounded-md bg-slate-500 px-2 py-1 text-[14px]">
                <ClockIcon />
                <span>
                  {runtimeGetHour(data.runtime)}H{" "}
                  {runtimeGetMinute(data.runtime)}M
                </span>
              </span>
              {/* Date */}
              <span className="mr-4 inline-flex space-x-2 rounded-md bg-slate-500 px-2 py-1 text-[14px]">
                <CalendarIcon />
                <span>{data.release_date}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Fake Contents */}
      <div className="flex flex-col gap-3 p-4 pb-16 md:gap-5 md:p-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            className="flex h-[60px] w-full gap-3 md:h-[110px] md:gap-6"
            key={i}
          >
            <div className="aspect-[16/9] h-full rounded-md bg-[#212121]"></div>
            <div className="flex w-full flex-col justify-between py-1">
              <div className="h-[12px] w-4/12 rounded-full bg-[#212121] md:h-[20px]"></div>
              <div className="h-[8px] w-11/12 rounded-full bg-[#212121] md:h-[14px]"></div>
              <div className="h-[8px] w-11/12 rounded-full bg-[#212121] md:h-[14px]"></div>
              <div className="h-[8px] w-8/12 rounded-full bg-[#212121] md:h-[14px]"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
