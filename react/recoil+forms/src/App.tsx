import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { I데이터, 데이터Atom } from "./atoms";
import { useCallback, useMemo } from "react";
import { Item, ItemRenderer } from "./components";
import { ItemType } from "./components/Item";
import { ErrorTextDiv } from "./App.styles";

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

  const 제출했을때: SubmitHandler<I폼> = useCallback(
    (제출된데이터) => {
      // newValue에서 양쪽 공백을 제거
      const newValue = 제출된데이터.나라입력.trim();

      // 데이터 길이 검사
      if (newValue.length === 0) {
        setError("나라입력", { type: "custom", message: "👀 Required!" });
        return;
      }

      // 데이터 중복 검사
      if (isDuplicated(newValue, 데이터)) {
        setError("나라입력", { type: "custom", message: "👀 Duplicated!" });
        return;
      }

      set데이터((prev데이터) => ({
        ...prev데이터,
        가고싶은: [...prev데이터.가고싶은, newValue],
      }));
      reset();
    },
    [데이터]
  );

  return (
    <main>
      {/* Form Area */}
      <div>
        <h2>가고 싶은 나라를 입력하세요.</h2>
        <form
          onSubmit={handleSubmit(제출했을때)}
          style={{ display: "flex" }}
        >
          <input
            placeholder="여기에 나라를 입력"
            {...register("나라입력", { required: "👀 Required!" })}
          />
          <input
            type="submit"
            value="가자!"
          />
        </form>
        <ErrorTextDiv>
          {errors.나라입력 && <div>{errors.나라입력.message}</div>}
        </ErrorTextDiv>
      </div>
      <hr />
      {/* 가고싶은 나라 Area */}
      <h3>내가 가고싶은 나라들</h3>
      <ItemRenderer
        itemList={가고싶은}
        itemType={ItemType.가고싶은}
      />
      <hr />
      {/* 가본 나라 Area */}
      <h3>가본 나라</h3>
      <ItemRenderer
        itemList={가본}
        itemType={ItemType.가본}
      />
      <hr />
      {/* 좋아하는 나라 Area */}
      <h3>좋아하는 나라</h3>
      <ItemRenderer
        itemList={좋아하는}
        itemType={ItemType.좋아하는}
      />
    </main>
  );
}

/** newValue가 data의 모든 배열의 값 중 중복이 발견되면 true를 반환합니다. */
const isDuplicated = (newValue: string, data: I데이터) => {
  // 데이터 중복 검사
  for (const each데이터 of Object.values(data)) {
    if ((each데이터 as string[]).includes(newValue)) {
      return true;
    }
  }
  return false;
};
