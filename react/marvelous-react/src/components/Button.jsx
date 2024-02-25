import styled from "styled-components";
import PropTypes from "prop-types";

export default function Button({ text, handleClick = () => {} }) {
  return (
    <Wrapper onClick={handleClick}>
      <h1>{text}</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 140px;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.5);
  border: 2px solid white;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 22px;
  font-weight: 500;
`;

Button.propTypes = {
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
};
