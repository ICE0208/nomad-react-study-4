import PropTypes from "prop-types";
import * as S from "../styles/herocards.styled";
import { useEffect, useRef } from "react";

export default function HeroCards({ heros = [] }) {
  return (
    <S.Wrapper>
      {heros.map((hero) => (
        <HeroCard
          key={hero.id}
          hero={hero}
        />
      ))}
    </S.Wrapper>
  );
}

HeroCards.propTypes = {
  heros: PropTypes.array,
};

function HeroCard({ hero }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const rotateY = (40 / -200) * offsetX + 20;
      const rotateX = (1 / 14) * offsetY - 15;
      card.style.transition = "transform 0.1s ease";
      card.style.transform = `perspective(700px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transition = "transform 2s ease";
      card.style.transform = "";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <S.Card ref={cardRef}>
      <S.CardImg $imgUrl={`${hero.thumbnail.path}.jpg`}>
        <S.CardText>{hero.name.split("(")[0].trim()}</S.CardText>
      </S.CardImg>
    </S.Card>
  );
}

HeroCard.propTypes = {
  hero: PropTypes.object,
};
