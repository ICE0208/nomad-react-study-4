interface CharacterCardProps {
  imgUrl: string;
  name: string;
}

export default function CharacterCard({ imgUrl, name }: CharacterCardProps) {
  return (
    <div className="flex h-[280px] w-[360px] flex-col items-center justify-start rounded-3xl bg-gradient-to-b from-violet-700 to-indigo-700 p-6 shadow-2xl ">
      {/* Image */}
      <div
        style={{ backgroundImage: `url("${imgUrl}")` }}
        className="mb-4 min-h-[180px] w-full rounded-lg bg-white bg-cover bg-top"
      ></div>
      {/* Text */}
      <div className="w-full">
        <span className="text-2xl font-semibold text-white drop-shadow-xl">
          {name}
        </span>
      </div>
    </div>
  );
}
