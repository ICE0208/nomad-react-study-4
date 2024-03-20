import { IMovie, makeImagePath } from "@/api";

interface MovieProps {
  data: IMovie;
}

export default function Movie({ data }: MovieProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <img src={makeImagePath(data.poster_path)} />
      <p className="min-h-[60px] text-xl">{data.title}</p>
    </div>
  );
}
