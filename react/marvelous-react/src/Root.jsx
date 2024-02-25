import { useEffect, useState } from "react";
import styled from "styled-components";
import HeroCards from "./components/HeroCards";
import { Outlet, useMatch } from "react-router-dom";
import useScrollable from "./hooks/useScrollable";
import { getCharacterListURL } from "./utils/getURL";

function Root() {
  const [heroList, setHeroList] = useState(null);
  const { setScrollable } = useScrollable(true);

  const matchRoot = useMatch("/");

  useEffect(() => {
    setScrollable(Boolean(matchRoot));
  }, [matchRoot, setScrollable]);

  const getCharacterList = async () => {
    try {
      const response = await fetch(getCharacterListURL());
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
      {heroList === null ? (
        <Loading>
          <LoadingText>loading...</LoadingText>
        </Loading>
      ) : (
        <HeroCards heros={heroList} />
      )}
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
  font-size: 60px;
  font-weight: bold;
`;

const Loading = styled.div`
  margin-top: 100px;
`;
const LoadingText = styled.h4`
  font-size: 48px;
  color: #dddddd;
`;

export default Root;
