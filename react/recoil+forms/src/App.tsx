import { FieldValues, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { 데이터Atom } from "./atoms";
import { useMemo } from "react";

interface I폼 {
  나라입력: string;
}

export default function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<I폼>();
  const 제출했을때 = (data: FieldValues) => console.log(data);

  const [데이터, set데이터] = useRecoilState(데이터Atom);

  const { 가고싶은, 가본, 좋아하는 } = useMemo(() => {
    return 데이터;
  }, [데이터]);

  return (
    <main>
      <h2>내가 가고싶은 나라들</h2>
      <div>
        <form onSubmit={handleSubmit(제출했을때)}>
          <input
            placeholder="여기에 나라를 입력"
            {...register("나라입력", { required: "👀 Required!" })}
          />
          <input
            type="submit"
            value="가자!"
          />
          {errors.나라입력 && <div>{errors.나라입력.message}</div>}
        </form>
      </div>
    </main>
  );
}
