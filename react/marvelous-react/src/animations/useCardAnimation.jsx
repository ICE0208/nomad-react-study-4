import { useEffect, useRef } from "react";
import useWindowDimensions from "../hooks/getWindowDimensions";
import { CARD_WIDTH } from "../styles/herocards.styled";

export default function useCardAnimation(clicked) {
  const cardRef = useRef(null);
  const overlayRef = useRef(null);

  const { width } = useWindowDimensions();

  useEffect(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const rotateY = (40 / -300) * offsetX + 20;
      const rotateX = (1 / 14) * offsetY - 15;
      card.style.transition = "transform 0.1s ease";
      card.style.transform = `perspective(700px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

      // Card Overlay
      overlay.style = `background-position : ${
        offsetX / 5 + offsetY / 5
      }%; filter: opacity(0.6)`;
    };

    const handleMouseLeave = () => {
      card.style.transition = "transform 0.8s ease";
      if (!clicked) {
        card.style.transform = "";
      }
      overlay.style = "filter: opacity(0)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [clicked]);

  useEffect(() => {
    if (clicked) {
      const card = cardRef.current;
      card.style.pointerEvents = "none";
      card.style.transition = "transform 0s";
      card.style.transform = "";
      const clientRect = card.getBoundingClientRect();
      const relativeTop = clientRect.top;
      const relativeLeft = clientRect.left;
      card.style.transition = "transform 0.8s";
      card.style.transform = `translate(${
        -1 * relativeLeft + width / 2 - CARD_WIDTH / 2
      }px, ${-1 * relativeTop + 65}px) rotateY(360deg) scale(1.1)`;
      card.style.zIndex = "500";
    } else {
      const card = cardRef.current;
      card.style.pointerEvents = "auto";
      card.style.transform = ``;
      card.style.transition = "transform 0.8s ease";
      card.style.zIndex = "auto";
    }
  }, [clicked, width]);

  return { cardRef, overlayRef };
}
