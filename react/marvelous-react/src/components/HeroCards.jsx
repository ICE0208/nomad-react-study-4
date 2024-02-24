import styled from "styled-components";
import PropTypes from "prop-types";

export default function HeroCards({ heros = [] }) {
  return (
    <Wrapper>
      {heros.map((hero) => (
        <Child
          key={hero.id}
          $imgUrl={`${hero.thumbnail.path}.jpg`}
        >
          <h1>{hero.name}</h1>
        </Child>
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

const Child = styled.div`
  width: 280px;
  height: 400px;
  background-color: teal;
  justify-self: center;
  background-image: url(${(props) => props.$imgUrl});
  background-size: cover;
  background-position: center;
`;
