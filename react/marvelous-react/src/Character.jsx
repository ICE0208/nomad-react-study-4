import styled from "styled-components";

export default function Character() {
  return (
    <Wrapper>
      <Content></Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  overflow-y: scroll;
  height: 100%;
`;
