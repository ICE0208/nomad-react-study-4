import { IMovieDetail, makeImagePath } from "@/api";
import { runtimeGetHour, runtimeGetMinute } from "@/utils/runtimeFormat";
import { VoteStarDisplay } from "..";

interface ModalContentProps {
  data: IMovieDetail;
}

export default function ModalContent({ data }: ModalContentProps) {
  return (
    <>
      {/* header */}
      <div
        className="relative h-44 w-full bg-slate-400 bg-cover bg-center text-neutral-50 opacity-80"
        style={{
          backgroundImage: `url(${makeImagePath(data.poster_path)})`,
        }}
      >
        <div className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-4 px-6 py-4">
          <h2
            className={[
              "max-w-[300px] text-3xl font-semibold",
              "shadow-black [text-shadow:2px_2px_4px_var(--tw-shadow-color)]",
            ].join(" ")}
          >
            {data.title}
          </h2>
          <div className="flex space-x-2 text-2xl font-medium">
            <span>{runtimeGetHour(data.runtime)}h</span>
            <span>{runtimeGetMinute(data.runtime)}m</span>
          </div>
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col gap-5 p-8 text-[18px] font-medium text-neutral-300">
        <span className="text-xl font-semibold italic">
          {data.release_date}
        </span>
        <VoteStarDisplay vote={data.vote_average} />
        <span className="line-clamp-3">{data.overview}</span>
      </div>
    </>
  );
}
