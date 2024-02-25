export const getCharacterListURL = () =>
  "https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023";

export const getCharacterDetailURL = (id) =>
  `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`;

export const getCharacterComicsURL = (id) =>
  `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}/comics`;

export const getCharacterSeriesURL = (id) =>
  `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}/series`;
export const getCharacterStoriesURL = (id) =>
  `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}/stories`;

export const getCharacterEventsURL = (id) =>
  `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}/events`;
