import styled from "styled-components";
import PropTypes from "prop-types";
import MiniCard from "./MiniCard";
import { getSmallImageURL } from "../utils/getURL";

export default function ComicImgs({ comic1, comic2, comic3 }) {
  const comics = [comic1, comic2, comic3];

  return (
    <Wrapper>
      {comics.map((comic, index) => {
        return (
          <MiniCard
            key={comic.id}
            imgUrl={getSmallImageURL(comic.thumbnail)}
            title={comic.title}
            style={`position: absolute; top: 0px; transform: rotateZ(${
              index * 17 + -10
            }deg); transform-origin: bottom center;`}
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 300px;
  height: 250px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
`;

ComicImgs.propTypes = {
  comic1: PropTypes.object.isRequired,
  comic2: PropTypes.object.isRequired,
  comic3: PropTypes.object.isRequired,
};
