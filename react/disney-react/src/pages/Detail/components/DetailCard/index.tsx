import { Detail } from "@/types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface DetailCardProps extends Detail {}

export default function DetailCard({
  films,
  sourceUrl,
  name,
  imageUrl,
}: DetailCardProps) {
  const navigate = useNavigate();
  const onBackIconClick = () => {
    // history state가 있으면 뒤로 가고, 없으면 루트 페이지로 이동
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1); // 뒤로 가기
    } else {
      navigate("/", { replace: true }); // 루트 페이지로 이동
    }
  };
  const onMoreIconClick = () => {
    window.open(sourceUrl, "_blank");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className={[
        "relative flex min-h-[540px] w-[760px] flex-col items-center justify-between rounded-3xl p-10",
        "bg-gradient-to-r from-violet-600 to-indigo-600 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]",
        "transition-all md:min-h-[500px] md:w-full sm:min-h-[460px]",
      ].join(" ")}
    >
      {/* CARD ICON AREA */}
      <div
        className={[
          "absolute left-0 top-0 flex h-fit w-full items-center justify-between px-4 py-6",
          "sm:bottom-0 sm:top-auto",
        ].join(" ")}
      >
        {/* Back Icon Button */}
        <div
          className="cursor-pointer sm:pointer-events-none sm:opacity-0"
          onClick={onBackIconClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3.0}
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        {/* More Icon Button */}
        <div className="cursor-pointer" onClick={onMoreIconClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8"
          >
            <path d="M21.721 12.752a9.711 9.711 0 0 0-.945-5.003 12.754 12.754 0 0 1-4.339 2.708 18.991 18.991 0 0 1-.214 4.772 17.165 17.165 0 0 0 5.498-2.477ZM14.634 15.55a17.324 17.324 0 0 0 .332-4.647c-.952.227-1.945.347-2.966.347-1.021 0-2.014-.12-2.966-.347a17.515 17.515 0 0 0 .332 4.647 17.385 17.385 0 0 0 5.268 0ZM9.772 17.119a18.963 18.963 0 0 0 4.456 0A17.182 17.182 0 0 1 12 21.724a17.18 17.18 0 0 1-2.228-4.605ZM7.777 15.23a18.87 18.87 0 0 1-.214-4.774 12.753 12.753 0 0 1-4.34-2.708 9.711 9.711 0 0 0-.944 5.004 17.165 17.165 0 0 0 5.498 2.477ZM21.356 14.752a9.765 9.765 0 0 1-7.478 6.817 18.64 18.64 0 0 0 1.988-4.718 18.627 18.627 0 0 0 5.49-2.098ZM2.644 14.752c1.682.971 3.53 1.688 5.49 2.099a18.64 18.64 0 0 0 1.988 4.718 9.765 9.765 0 0 1-7.478-6.816ZM13.878 2.43a9.755 9.755 0 0 1 6.116 3.986 11.267 11.267 0 0 1-3.746 2.504 18.63 18.63 0 0 0-2.37-6.49ZM12 2.276a17.152 17.152 0 0 1 2.805 7.121c-.897.23-1.837.353-2.805.353-.968 0-1.908-.122-2.805-.353A17.151 17.151 0 0 1 12 2.276ZM10.122 2.43a18.629 18.629 0 0 0-2.37 6.49 11.266 11.266 0 0 1-3.746-2.504 9.754 9.754 0 0 1 6.116-3.985Z" />
          </svg>
        </div>
      </div>
      {/* CARD TOP */}
      <div className="flex flex-col items-center justify-center">
        {/* Profile Image */}
        <div
          className="h-40 w-40 rounded-full bg-center"
          style={{
            backgroundImage: `url(${imageUrl})`,
          }}
        ></div>
        {/* Profile Name */}
        <div
          style={{ textShadow: "rgb(0 0 0 / 30%) 2px 3px 10px" }}
          className="mt-4 text-center text-4xl font-semibold sm:text-3xl"
        >
          <span>{name}</span>
        </div>
      </div>
      {/* Films Tags */}
      <div className="mt-24 flex w-10/12 flex-wrap justify-center gap-x-3 gap-y-1 sm:gap-x-2 sm:gap-y-0">
        {films.map((film) => {
          return (
            <p
              key={film}
              style={{ textShadow: "rgb(0 0 0 / 25%) 2px 4px 8px" }}
              className="text-md text-center text-sm italic"
            >
              #{film}
            </p>
          );
        })}
      </div>
    </div>
  );
}
