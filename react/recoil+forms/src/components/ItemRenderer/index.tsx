import { Item } from "..";
import { ItemType } from "../Item";

interface ItemRendererProps {
  itemList: string[];
  itemType: ItemType;
}

/** 특정 타입의 데이터 배열을 받아서 `spread` 해줍니다. */
export default function ItemRenderer({
  itemList,
  itemType,
}: ItemRendererProps) {
  return (
    <>
      {itemList.map((item) => (
        <Item
          key={item}
          text={item}
          type={itemType}
        />
      ))}
    </>
  );
}
