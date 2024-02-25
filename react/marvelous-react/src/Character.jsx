import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useDetailInfo from "./hooks/useDetailInfo";

export default function Character() {
  const contentRef = useRef(null);
  const { id } = useParams();
  const { characterInfo, comicsInfo } = useDetailInfo(id);

  useEffect(() => {
    if (characterInfo && comicsInfo) {
      console.log(characterInfo, comicsInfo);
    }
  }, [characterInfo, comicsInfo]);

  useEffect(() => {
    if (contentRef) {
      contentRef.current.style = "opacity: 1";
    }
  }, [contentRef]);

  return (
    <Wrapper>
      <Content ref={contentRef}>
        {characterInfo && <h1>{characterInfo.description}</h1>}
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 0;
  width: 1200px;
  height: 760px;
  transition: opacity 0.3s ease-in-out;
`;
