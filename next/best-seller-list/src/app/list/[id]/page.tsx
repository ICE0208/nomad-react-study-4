interface ParamsProps {
  id: string;
}

interface GenreListPageProps {
  params: ParamsProps;
}

export default function GenreListPage({ params }: GenreListPageProps) {
  console.log(params);
  return <h1>{params.id}</h1>;
}
