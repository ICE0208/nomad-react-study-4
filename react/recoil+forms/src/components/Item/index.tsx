import useHandleItemBtn from "./useHandleItemBtn";
import { getFirstBtnText, getSecondBtnText } from "./utils";

export enum ItemType {
  "가고싶은" = "가고싶은",
  "가본" = "가본",
  "좋아하는" = "좋아하는",
}

interface ItemProps {
  text: string;
  type: ItemType;
}

/**  특정 타입의 Item 하나를 담당하는 컴포넌트입니다.  */
export default function ItemComponent({ text, type }: ItemProps) {
  const { handleFirstBtn, handleSecondBtn } = useHandleItemBtn(type, text);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "4px 0",
      }}
    >
      {/* item 텍스트 */}
      <span style={{ fontSize: 18 }}>{text}</span>
      {/* 첫 번째 버튼 */}
      <button
        onClick={handleFirstBtn}
        style={buttonStyles}
      >
        {getFirstBtnText(type)}
      </button>
      {/* 두 번째 버튼 */}
      {/* `좋아하는` 타입의 데이터는 두 번째 버튼을 보여주지않습니다. */}
      {type !== ItemType.좋아하는 && (
        <button
          onClick={handleSecondBtn}
          style={buttonStyles}
        >
          {getSecondBtnText(type)}
        </button>
      )}
    </div>
  );
}

const buttonStyles = {
  width: "40px",
  height: "40px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 12,
  margin: 0,
  padding: 0,
};
