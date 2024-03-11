interface CharacterCardProps extends Character {}
import { Character } from "@/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CharacterCard({
  id,
  name,
  imageUrl,
}: CharacterCardProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigator = useNavigate();

  const handleImageLoaded = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const imgElement = e.target as HTMLImageElement;
    const { naturalWidth, naturalHeight } = imgElement;

    // Not Found 응답 이미지의 너비가 200, 높이가 114 이다.
    if (naturalWidth == 200 && naturalHeight == 114) {
      setImageError(true);
    }

    setImageLoaded(true);
  };

  const handleClick = () => {
    if (!imageLoaded) return;

    navigator(`character/${id}`);
  };

  return (
    !imageError && (
      <div
        className="flex h-[280px] w-[360px] cursor-pointer flex-col items-center justify-start rounded-3xl bg-gradient-to-r from-violet-700 to-indigo-700 p-6 shadow-2xl transition-all duration-200 ease-in-out hover:scale-105"
        onClick={handleClick}
      >
        <img
          src={imageUrl}
          alt={name}
          onLoad={handleImageLoaded}
          style={{ display: "none" }}
        />

        {!imageError && (
          <div
            className="mb-3 min-h-[170px] w-full rounded-lg bg-white bg-cover bg-center"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        )}
        {/* Text */}
        <div className="w-full truncate text-white">
          <span className="text-2xl font-semibold text-white drop-shadow-xl">
            {name}
          </span>
        </div>
      </div>
    )
  );
}
