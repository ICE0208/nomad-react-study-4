import PropTypes from "prop-types";
import * as S from "../styles/herocards.styled";

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
  return (
    <S.Card>
      <S.CardImg $imgUrl={`${hero.thumbnail.path}.jpg`}>
        <S.CardText>{hero.name.split("(")[0].trim()}</S.CardText>
      </S.CardImg>
    </S.Card>
  );
}

HeroCard.propTypes = {
  hero: PropTypes.object,
};
