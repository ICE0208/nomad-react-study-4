import PropTypes from "prop-types";
import * as S from "../styles/herocards.styled";

export default function HeroCards({ heros = [] }) {
  return (
    <S.Wrapper>
      {heros.map((hero) => (
        <S.Card key={hero.id}>
          <S.CardImg $imgUrl={`${hero.thumbnail.path}.jpg`}>
            <S.CardText>{hero.name.split("(")[0].trim()}</S.CardText>
          </S.CardImg>
        </S.Card>
      ))}
    </S.Wrapper>
  );
}

HeroCards.propTypes = {
  heros: PropTypes.array,
};
