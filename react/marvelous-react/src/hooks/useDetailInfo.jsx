import { useEffect, useState } from "react";
import {
  getCharacterComicsURL,
  getCharacterDetailURL,
  getCharacterEventsURL,
  getCharacterSeriesURL,
  getCharacterStoriesURL,
} from "../utils/getURL";

export default function useDetailInfo(id) {
  const [characterInfo, setCharacterInfo] = useState(null);
  const [comicsInfo, setComicsInfo] = useState(null);
  const [seriesInfo, setSeriesInfo] = useState(null);
  const [storiesInfo, setStoriesInfo] = useState(null);
  const [eventsInfo, setEventsInfo] = useState(null);

  const getCharacterInfo = async (id) => {
    try {
      const response = await fetch(getCharacterDetailURL(id));
      const json = await response.json();
      const result = json?.data?.results[0];

      setCharacterInfo(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getListInfo = async (url, setFunc) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      const results = json?.data?.results;

      setFunc(results);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getCharacterInfo(id);
    getListInfo(getCharacterComicsURL(id), setComicsInfo);
    getListInfo(getCharacterStoriesURL(id), setStoriesInfo);
    getListInfo(getCharacterEventsURL(id), setEventsInfo);
    getListInfo(getCharacterSeriesURL(id), setSeriesInfo);
  }, [id]);

  return { characterInfo, comicsInfo, seriesInfo, storiesInfo, eventsInfo };
}
