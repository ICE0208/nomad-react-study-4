import { Detail } from "@/types";
import { getDetailApiUrl } from "./apiUtils";

export default async function getDetail(id: number) {
  const response = await fetch(getDetailApiUrl(id));
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const result: Detail = await response.json();

  return result;
}
