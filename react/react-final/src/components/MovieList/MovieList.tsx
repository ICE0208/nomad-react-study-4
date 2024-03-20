import { IMovie } from "@/api";
import Movie from "./Movie";

interface MoveListProps {
  datas: IMovie[];
}

export default function MovieList({ datas }: MoveListProps) {
  return (
    <>
      <div
        className={[
          "grid w-full max-w-[900px] grid-cols-[repeat(auto-fit,minmax(180px,1fr))]",
          "justify-items-center gap-x-16 gap-y-12",
        ].join(" ")}
      >
        {datas.map((data) => (
          <Movie key={data.id} data={data} />
        ))}
      </div>
    </>
  );
}
