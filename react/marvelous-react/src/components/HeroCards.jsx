import styled from "styled-components";
import PropTypes from "prop-types";

export default function HeroCards({ heros = [] }) {
  return (
    <Wrapper>
      {heros.map((hero) => (
        <Card key={hero.id}>
          <CardImg $imgUrl={`${hero.thumbnail.path}.jpg`}>
            <CardText>{hero.name.split("(")[0].trim()}</CardText>
          </CardImg>
        </Card>
      ))}
    </Wrapper>
  );
}

HeroCards.propTypes = {
  heros: PropTypes.array,
};

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  grid-row-gap: 60px;
  padding: 60px 0;
  max-width: 1400px;
`;

const Card = styled.div`
  background-color: white;
  justify-self: center;
  padding: 8px;
  width: 290px;
  border-radius: 6px;
`;
const CardImg = styled.div`
  width: 100%;
  height: 400px;

  background-image: url(${(props) => props.$imgUrl});
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 2px solid black;
`;
const CardText = styled.p`
  text-align: center;
  background-color: white;
  font-size: 18px;
  color: black;
  padding-top: 14px;
  padding-bottom: 10px;
  font-weight: bold;
  border-top: 2px solid black;
  opacity: 0.9;
`;
