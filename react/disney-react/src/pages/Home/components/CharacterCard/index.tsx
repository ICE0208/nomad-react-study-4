interface CharacterCardProps {
  imgUrl: string;
  name: string;
}
import { useState } from "react";

export default function CharacterCard({ imgUrl, name }: CharacterCardProps) {
  const [imageError, setImageError] = useState(false);

  const handleImageLoaded = (
    e: React.SyntheticEvent<HTMLImageElement, Event>,
  ) => {
    const imgElement = e.target as HTMLImageElement;
    const { naturalWidth, naturalHeight } = imgElement;

    // Not Found 응답 이미지의 너비가 200, 높이가 114 이다.
    if (naturalWidth == 200 && naturalHeight == 114) {
      setImageError(true);
    }
  };

  return (
    !imageError && (
      <div className="flex h-[280px] w-[360px] flex-col items-center justify-start rounded-3xl bg-gradient-to-r from-violet-700 to-indigo-700 p-6 shadow-2xl ">
        <img
          src={imgUrl}
          alt={name}
          onLoad={handleImageLoaded}
          style={{ display: "none" }}
        />

        {!imageError && (
          <div
            className="mb-3 min-h-[170px] w-full rounded-lg bg-white bg-cover bg-center"
            style={{ backgroundImage: `url(${imgUrl})` }}
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
