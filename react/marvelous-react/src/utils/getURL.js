export const getCharacterListURL = () =>
  "https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023";

export const getCharacterDetailURL = (id) =>
  `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`;

export const getCharacterComicsURL = (id) =>
  `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}/comics`;

export const getCharacterSeriesURL = (id) =>
  `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}/series`;

export const getCharacterEventsURL = (id) =>
  `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}/events`;

export const getBigImageURL = (thumbnail) => {
  if (thumbnail) {
    return `${thumbnail.path}/portrait_uncanny.jpg`;
  }
  return "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg";
};

export const getSmallImageURL = (thumbnail) => {
  if (thumbnail) {
    return `${thumbnail.path}/portrait_fantastic.jpg`;
  }
  return "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_xlarge.jpg";
};
