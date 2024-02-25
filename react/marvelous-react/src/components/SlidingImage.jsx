import styled from "styled-components";
import PropTypes from "prop-types";
import { useState } from "react";
import MiniCard from "./MiniCard";
import { getSmallImageURL } from "../utils/getURL";

export default function SlidingImage({ infos, title }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const moveIndex = (value) => {
    if (!infos || infos.length === 0) return;
    setSelectedIndex((prev) => (prev + value + infos.length) % infos.length);
  };

  return (
    <Wrapper>
      {infos === null ? (
        <>
          <SlidingTitle>0 {title}</SlidingTitle>
          <SlidingArea>
            <ChangeButton
              text="<"
              onClick={() => {
                moveIndex(-1);
              }}
            />
            <MiniCard
              imgUrl=""
              title="LOADING..."
            />
            <ChangeButton
              text=">"
              onClick={() => {
                moveIndex(1);
              }}
            />
          </SlidingArea>
        </>
      ) : (
        <>
          <SlidingTitle>
            {infos.length} {title}
          </SlidingTitle>
          <SlidingArea>
            <ChangeButton
              text="<"
              onClick={() => {
                moveIndex(-1);
              }}
            />
            {infos.length === 0 ? (
              <MiniCard
                imgUrl=""
                title={`No ${title}`}
              />
            ) : (
              <MiniCard
                imgUrl={getSmallImageURL(infos[selectedIndex].thumbnail)}
                title={infos[selectedIndex].title}
              />
            )}
            <ChangeButton
              text=">"
              onClick={() => {
                moveIndex(1);
              }}
            />
          </SlidingArea>
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 230px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const SlidingArea = styled.div`
  display: flex;
  align-items: center;
`;
const SlidingTitle = styled.h3`
  font-size: 26px;
  font-weight: 500;
`;

SlidingImage.propTypes = {
  infos: PropTypes.array,
  title: PropTypes.string.isRequired,
};

// -----

const ChangeButton = ({ text, onClick = () => {} }) => {
  return <ButtonWrapper onClick={onClick}>{text}</ButtonWrapper>;
};

const ButtonWrapper = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

ChangeButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
