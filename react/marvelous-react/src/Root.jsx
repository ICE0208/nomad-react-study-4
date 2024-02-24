import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import HeroCards from "./components/HeroCards";

let isApiCalled = false;

function Root() {
  const [heroList, setHeroList] = useState([]);

  const getCharacterList = async () => {
    try {
      const response = await fetch(
        "https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023"
      );
      const json = await response.json();
      const results = json?.data?.results;

      // 썸네일 이미지가 없는 요소 제거
      const filterdResults = results.filter(
        (result) => !result.thumbnail.path.includes("image_not_available")
      );
      setHeroList(filterdResults);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isApiCalled) return;

    getCharacterList();
    isApiCalled = true;
  }, []);

  return (
    <Wrapper>
      <Title>Marvel Characters</Title>
      <HeroCards heros={heroList} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 20px;
`;
const Title = styled.h1`
  font-size: 44px;
`;

export default Root;
