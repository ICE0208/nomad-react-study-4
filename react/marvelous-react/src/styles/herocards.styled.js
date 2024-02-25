import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
  grid-row-gap: 60px;
  padding: 60px 0;
  max-width: 1400px;
`;

export const CARD_WIDTH = "300";
export const Card = styled.div`
  position: relative;
  background-color: white;
  justify-self: center;
  padding: 8px;
  width: ${CARD_WIDTH}px;
  height: 420px;
  border-radius: 6px;
  cursor: pointer;
  overflow: hidden;
`;
export const CardImg = styled.div`
  width: 100%;
  height: 100%;

  background-image: url(${(props) => props.$imgUrl});
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border: 2px solid black;
  overflow: hidden;
`;
export const CardText = styled.p`
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

export const CardOverlay = styled.div`
  position: absolute;
  width: 290px;
  height: 100%;
  background: linear-gradient(
    105deg,
    transparent 40%,
    #000000 45%,
    rgba(255, 228, 148, 0.5) 40%,
    rgba(206, 177, 249, 0.4) 50%,
    transparent 54%
  );
  filter: brightness(5) opacity(0);
  mix-blend-mode: color-dodge;
  background-size: 150% 150%;
  background-position: 100%;
`;
