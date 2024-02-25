import { useEffect, useState } from "react";
import styled from "styled-components";
import HeroCards from "./components/HeroCards";
import { Outlet, useMatch } from "react-router-dom";
import useScrollable from "./hooks/useScrollable";

function Root() {
  const [heroList, setHeroList] = useState([]);
  const { setScrollable } = useScrollable(true);

  const matchRoot = useMatch("/");

  useEffect(() => {
    setScrollable(Boolean(matchRoot));
  }, [matchRoot, setScrollable]);

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
    getCharacterList();
  }, []);

  return (
    <Wrapper>
      <Title>Marvel Characters</Title>
      <HeroCards heros={heroList} />
      <Outlet />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 46px 40px;
`;
const Title = styled.h1`
  font-size: 52px;
`;

export default Root;
