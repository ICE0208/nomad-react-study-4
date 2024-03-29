import { getBookListWithGenre } from "@/api/request";
import { redirect } from "next/navigation";

interface ParamsProps {
  id: string;
}

interface GenreListLoadingPageProps {
  params: ParamsProps;
}

export default async function GenreListLoadingPage({
  params,
}: GenreListLoadingPageProps) {
  const { id: genreCode } = params;
  await getBookListWithGenre(genreCode);

  redirect(`/list/${genreCode}`);
}
