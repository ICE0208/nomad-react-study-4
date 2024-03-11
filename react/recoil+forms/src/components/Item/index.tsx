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

export default function ItemComponent({ text, type }: ItemProps) {
  const { handleFirstBtn, handleSecondBtn } = useHandleItemBtn(type, text);

  return (
    <div>
      <span>{text}</span>
      <button onClick={handleFirstBtn}>{getFirstBtnText(type)}</button>
      {type !== ItemType.좋아하는 && (
        <button onClick={handleSecondBtn}>{getSecondBtnText(type)}</button>
      )}
    </div>
  );
}
