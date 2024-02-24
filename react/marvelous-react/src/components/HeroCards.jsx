import PropTypes from "prop-types";
import * as S from "../styles/herocards.styled";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

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
  const overlayRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const card = cardRef.current;
    const overlay = overlayRef.current;

    const handleMouseMove = (e) => {
      // Card
      const rect = card.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;

      const rotateY = (40 / -200) * offsetX + 20;
      const rotateX = (1 / 14) * offsetY - 15;
      card.style.transition = "transform 0.1s ease";
      card.style.transform = `perspective(700px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;

      //   Card OverLay
      overlay.style = `background-position : ${
        offsetX / 5 + offsetY / 5
      }%; filter: opacity(0.6)`;
    };

    const handleMouseLeave = () => {
      card.style.transition = "transform 2s ease";
      card.style.transform = "";
      overlay.style = "filter: opacity(0)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      <S.Card
        ref={cardRef}
        onClick={() => {
          navigate(`/character/${hero.id}`);
        }}
      >
        <S.CardOverlay ref={overlayRef} />
        <S.CardImg $imgUrl={`${hero.thumbnail.path}.jpg`}>
          <S.CardText>{hero.name.split("(")[0].trim()}</S.CardText>
        </S.CardImg>
      </S.Card>
    </>
  );
}

HeroCard.propTypes = {
  hero: PropTypes.object,
};
