import { useEffect, useState } from "react";

export default function useDetailInfo(id) {
  const [characterInfo, setCharacterInfo] = useState(null);
  const [comicsInfo, setComicsInfo] = useState(null);

  const getCharacterInfo = async (id) => {
    try {
      const response = await fetch(
        `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`
      );
      const json = await response.json();
      const result = json?.data?.results[0];

      setCharacterInfo(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getComicsInfo = async (id) => {
    try {
      const response = await fetch(
        `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}/comics`
      );
      const json = await response.json();
      const results = json?.data?.results;

      setComicsInfo(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCharacterInfo(id);
    getComicsInfo(id);
  }, [id]);

  return { characterInfo, comicsInfo };
}
