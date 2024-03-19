import { debounce } from "lodash";
import { useCallback, useEffect, useMemo, useState } from "react";

type CardPerSlideTypes = 1 | 2 | 3 | 4 | 5;

export default function useCardPerSlide() {
  const [cardPerSlide, setCardPerSlide] = useState<CardPerSlideTypes>(4);

  const updateCardPerSlide = useCallback(() => {
    const {
      body: { clientWidth },
    } = document;

    // Configure Breakpoints...
    if (clientWidth <= 650) {
      setCardPerSlide(1);
    } else if (clientWidth <= 900) {
      setCardPerSlide(2);
    } else if (clientWidth <= 1200) {
      setCardPerSlide(3);
    } else if (clientWidth <= 1600) {
      setCardPerSlide(4);
    } else {
      setCardPerSlide(5);
    }
  }, []);

  const debounceWindowSizeChange = useMemo(
    () => debounce(updateCardPerSlide, 10),
    [updateCardPerSlide],
  );

  useEffect(() => {
    window.addEventListener("resize", debounceWindowSizeChange);

    return () => window.removeEventListener("resize", debounceWindowSizeChange);
  }, [debounceWindowSizeChange]);

  useEffect(() => {
    // 초기 cardPerSlide 세팅
    updateCardPerSlide();
  }, [updateCardPerSlide]);

  return cardPerSlide;
}
