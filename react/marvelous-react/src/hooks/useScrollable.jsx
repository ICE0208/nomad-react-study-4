import { useCallback, useEffect, useState } from "react";

export default function useScrollable(initScrollable) {
  const [scrollable, setScrollable] = useState(initScrollable);
  const [prevScrollY, setPrevScrollY] = useState(0);

  const preventScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    console.log(currentScrollY);
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
    document.body.style.overflowY = "scroll";
    setPrevScrollY(currentScrollY);
  }, []);

  const allowScroll = useCallback(() => {
    document.body.style.position = "";
    document.body.style.width = "";
    document.body.style.top = "";
    document.body.style.overflowY = "";
    window.scrollTo(0, prevScrollY);
  }, [prevScrollY]);

  useEffect(() => {
    if (scrollable && document.body.style.overflowY === "scroll") {
      allowScroll();
    } else if (!scrollable && document.body.style.overflowY === "") {
      preventScroll();
    }
  }, [scrollable, allowScroll, preventScroll]);

  return { scrollable, setScrollable };
}
