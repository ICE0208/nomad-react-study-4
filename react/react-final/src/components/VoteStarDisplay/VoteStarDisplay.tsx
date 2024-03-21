interface VoteStarDisplayProps {
  vote: number;
}

export default function VoteStarDisplay({ vote }: VoteStarDisplayProps) {
  const percentage = vote * 10;

  return (
    <span>
      <span
        style={{
          backgroundImage: `linear-gradient(to right, #ffff00f1 ${percentage}%, #808080f3 ${percentage}%)`,
        }}
        className="bg-clip-text"
      >
        <span className="text-[#ffffff00]">★★★★★</span>
      </span>
    </span>
  );
}
