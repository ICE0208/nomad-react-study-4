import { Item } from "..";
import { ItemType } from "../Item";

interface ItemRendererProps {
  itemList: string[];
  itemType: ItemType;
}

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
