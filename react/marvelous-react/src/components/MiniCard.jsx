import PropTypes from "prop-types";
import styled from "styled-components";
import { useEffect, useRef } from "react";

export default function MiniCard({ imgUrl, title, style = "" }) {
  const cardRef = useRef(null);
  useEffect(() => {
    cardRef.current.style = style;
  }, [cardRef, style]);

  return (
    <>
      <Card
        ref={cardRef}
        onClick={() => {}}
      >
        <CardImg $imgUrl={imgUrl}>
          <CardText>{title}</CardText>
        </CardImg>
      </Card>
    </>
  );
}

MiniCard.propTypes = {
  imgUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.string,
};

export const Card = styled.div`
  position: relative;
  background-color: #fffffffb;
  justify-self: center;
  padding: 6px;
  width: 170px;
  height: 235px;
  border-radius: 6px;
  overflow: hidden;
`;
export const CardImg = styled.div`
  width: 100%;
  height: 100%;
  background-color: #000000ad;
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
  font-size: 10px;
  color: black;
  padding: 0 6px;
  padding-top: 10px;
  padding-bottom: 6px;
  font-weight: bold;
  border-top: 2px solid black;
  opacity: 0.9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 28px;
`;
