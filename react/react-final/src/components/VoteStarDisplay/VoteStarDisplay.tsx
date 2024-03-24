interface VoteStarDisplayProps {
  vote: number;
}

export default function VoteStarDisplay({ vote }: VoteStarDisplayProps) {
  const percentage = vote * 10;

  return (
    <span className="space-x-1 rounded-md bg-slate-500 px-[6px] py-[4px] text-[14px]">
      <span
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff ${percentage}%, #b4b4b4 ${percentage}%)`,
        }}
        className="bg-clip-text"
      >
        <span className="text-[#ffffff00]">★★★★★</span>
      </span>
      <span className="font-medium">
        {(Math.floor(vote * 10) / 10).toFixed(1)}
      </span>
    </span>
  );
}
