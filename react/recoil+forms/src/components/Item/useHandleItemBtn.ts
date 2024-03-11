import { useCallback, useMemo } from "react";
import { ItemType } from ".";
import { useRecoilState } from "recoil";
import { I데이터, 데이터Atom } from "../../atoms";

export default function useHandleItemBtn(type: ItemType, itemText: string) {
  const [데이터, set데이터] = useRecoilState(데이터Atom);

  const handleUpdateData = useCallback(
    (fromKey: ItemType, toKey: ItemType) => {
      set데이터((prev데이터) => {
        // fromKey에서 항목 제거
        const filteredItems = prev데이터[fromKey].filter(
          (item) => item !== itemText
        );
        // toKey에 항목 추가, 이때 toKey가 undefined이면 추가하지 않음
        const updatedItems = toKey
          ? [...prev데이터[toKey], itemText]
          : prev데이터[toKey];

        return {
          ...prev데이터,
          [fromKey]: filteredItems,
          [toKey]: updatedItems,
        };
      });
    },
    [itemText, 데이터]
  );

  const handleFirstBtn = useCallback(() => {
    switch (type) {
      case ItemType.가고싶은:
        handleUpdateData(ItemType.가고싶은, ItemType.가본);
        break;
      case ItemType.가본:
        handleUpdateData(ItemType.가본, ItemType.좋아하는);
        break;
      case ItemType.좋아하는:
        handleUpdateData(ItemType.좋아하는, ItemType.가본);
        break;
      default:
        console.error("Error on useCallback of handleFirstBtn");
    }
  }, [type, 데이터]);

  return { handleFirstBtn };
}
