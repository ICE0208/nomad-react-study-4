import PropTypes from "prop-types";
import * as S from "../styles/herocards.styled";
import { useEffect, useState } from "react";
import { useNavigate, useMatch } from "react-router-dom";
import useCardAnimation from "../animations/useCardAnimation";

export default function HeroCards({ heros = [] }) {
  const [clickedId, setClickedId] = useState(null);
  const matchRoot = useMatch("/");

  useEffect(() => {
    if (matchRoot && clickedId) {
      setClickedId(null);
    }
  }, [matchRoot, clickedId]);

  return (
    <S.Wrapper>
      {heros.map((hero) => (
        <HeroCard
          key={hero.id}
          hero={hero}
          clicked={hero.id === clickedId}
          setClickedId={setClickedId}
        />
      ))}
    </S.Wrapper>
  );
}

HeroCards.propTypes = {
  heros: PropTypes.array,
};

function HeroCard({ hero, clicked, setClickedId }) {
  const navigate = useNavigate();
  const { cardRef, overlayRef } = useCardAnimation(clicked);

  return (
    <>
      <S.Card
        ref={cardRef}
        onClick={() => {
          navigate(`/character/${hero.id}`);
          setClickedId(hero.id);
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
  hero: PropTypes.object.isRequired,
  clicked: PropTypes.bool.isRequired,
  setClickedId: PropTypes.func.isRequired,
};
