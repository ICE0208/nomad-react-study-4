// API 기본 주소
const BASE_URL = "https://disney_api.nomadcoders.workers.dev";

// 캐릭터 API URL
export function getCharactersApiUrl() {
  return `${BASE_URL}/characters`;
}

// 캐릭터 디테일 API URL
export function getDetailApiUrl(id: number) {
  return `${BASE_URL}/characters/${id}`;
}
