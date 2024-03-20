import { useEffect } from "react";

export default function useBlockBodyScroll() {
  useEffect(() => {
    // Prevent Body Scroll
    const prevScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
    document.body.style.top = `-${prevScrollY}px`;
    document.body.style.overflowY = "scroll";

    return () => {
      // Allow Body Scroll
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      document.body.style.overflowY = "";
      window.scrollTo(0, prevScrollY);
    };
  }, []);
}
