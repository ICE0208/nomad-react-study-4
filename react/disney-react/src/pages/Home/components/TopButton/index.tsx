import { useEffect, useState } from "react";

export default function TopButton() {
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    if (!showButton) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleShowButton);
    return () => {
      window.removeEventListener("scroll", handleShowButton);
    };
  }, []);
  return (
    <>
      <div
        style={
          showButton
            ? { cursor: "pointer" }
            : { opacity: 0, pointerEvents: "none" }
        }
        className="fixed bottom-6 right-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-[#04030578] text-white shadow-2xl shadow-black transition-opacity ease-in-out"
        onClick={scrollToTop}
      >
        <span className="font-bold">TOP</span>
      </div>
    </>
  );
}
