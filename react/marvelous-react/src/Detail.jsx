import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import useDetailInfo from "./hooks/useDetailInfo";
import Button from "./components/Button";
import ComicImgs from "./components/ComicImgs";
import SlidingImage from "./components/SlidingImage";

export default function Detail() {
  const contentRef = useRef(null);
  const { id } = useParams();
  const { characterInfo, comicsInfo, seriesInfo, eventsInfo } =
    useDetailInfo(id);
  const navigator = useNavigate();

  useEffect(() => {
    if (contentRef) {
      contentRef.current.style = "opacity: 1";
    }
  }, [contentRef]);

  // Detail 페이지 내에서 사용될 버튼 클릭 핸들러 함수 정의
  const handleCloseButtonClick = () => {
    navigator("/");
  };

  const handleComicsButtonClick = () => {
    const comicUrl = characterInfo.urls.find((e) => e.type === "comiclink");
    if (comicUrl) {
      window.open(comicUrl.url, "_blank");
    } else {
      window.alert("해당 url이 없습니다. :(");
    }
  };

  useEffect(() => {
    const moveRoot = () => navigator("/");

    window.addEventListener("resize", moveRoot);
    return () => window.removeEventListener("resize", moveRoot);
  }, [navigator]);

  return (
    <Wrapper>
      <ModalBackground
        onClick={() => {
          navigator("/");
        }}
      />
      <Modal ref={contentRef}>
        <ButtonArea>
          <Button
            text={"Close"}
            handleClick={handleCloseButtonClick}
          />
          <Button
            text={"Comics"}
            handleClick={handleComicsButtonClick}
          />
        </ButtonArea>
        <SomethingArea>
          {comicsInfo && (
            <>
              <ComicImgs
                comic1={comicsInfo[0]}
                comic2={comicsInfo[1]}
                comic3={comicsInfo[2]}
              />
              <ComicImgs
                comic1={comicsInfo[3]}
                comic2={comicsInfo[4]}
                comic3={comicsInfo[5]}
              />
            </>
          )}
        </SomethingArea>
        <DescriptionArea>
          <SlidingImage
            title="COMICS"
            infos={comicsInfo}
          />
          <SlidingImage
            title="SERIES"
            infos={seriesInfo}
          />
          <SlidingImage
            title="EVENTS"
            infos={eventsInfo}
          />
        </DescriptionArea>
      </Modal>
    </Wrapper>
  );
}

const ModalBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

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

const Modal = styled.div`
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.9);
  opacity: 0;
  width: 1200px;
  height: 760px;
  transition: opacity 0.3s ease-in-out;
  padding: 40px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  border: 2px solid whitesmoke;
  box-shadow: -4px 4px 7px 0px #bababa7d;
`;

const ButtonArea = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const SomethingArea = styled.div`
  width: 100%;
  height: 340px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const DescriptionArea = styled.div`
  width: 100%;
  font-size: 18px;
  color: whitesmoke;
  padding: 0 36px;
  flex-grow: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
