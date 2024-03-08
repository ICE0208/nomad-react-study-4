import getDetail from "@/services/api/getDetails";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import DetailCard from "./components/DetailCard";

export default function Detail() {
  const { id } = useParams() as { id: string };

  // useQuery에는 변환된 숫자 ID를 사용
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getDetail(+id),
    queryKey: ["detail", +id], // 쿼리 키를 유니크하게 관리하기 위해 ID 포함
  });

  let content;

  if (isLoading) {
    content = (
      <>
        <span>Loading</span>
      </>
    );
  }

  if (isError) {
    content = <h1>Something is wrong. {error.message || ""}</h1>;
  }

  if (data) {
    content = <DetailCard {...data} />;
  }

  return (
    <div className="flex min-h-[700px] flex-col items-center px-8 py-12 text-white">
      {content}
    </div>
  );
}
