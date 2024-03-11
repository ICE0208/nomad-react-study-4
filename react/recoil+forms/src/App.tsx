import { FieldValues, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { 데이터Atom } from "./atoms";
import { useMemo } from "react";
import { Item, ItemRenderer } from "./components";
import { ItemType } from "./components/Item";

interface I폼 {
  나라입력: string;
}

export default function App() {
  const [데이터, set데이터] = useRecoilState(데이터Atom);

  const { 가고싶은, 가본, 좋아하는 } = useMemo(() => {
    return 데이터;
  }, [데이터]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<I폼>();
  const 제출했을때 = (data: FieldValues) => {
    const { 나라입력: newValue } = data;

    // 데이터 중복 검사
    for (const each데이터 of Object.values(데이터)) {
      if ((each데이터 as string[]).includes(newValue)) {
        setError("나라입력", { type: "custom", message: "Duplicated :(" });
        return;
      }
    }

    set데이터((prev데이터) => ({
      ...prev데이터,
      가고싶은: [...prev데이터.가고싶은, newValue],
    }));
    reset();
  };

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
      {/* 가고싶은 나라 Area */}
      <ItemRenderer
        itemList={가고싶은}
        itemType={ItemType.가고싶은}
      />
      {/* 가본 나라 Area */}
      <h2>가본 나라</h2>
      <ItemRenderer
        itemList={가본}
        itemType={ItemType.가본}
      />
      {/* 좋아하는 나라 Area */}
      <h2>좋아하는 나라</h2>
      <ItemRenderer
        itemList={좋아하는}
        itemType={ItemType.좋아하는}
      />
    </main>
  );
}
