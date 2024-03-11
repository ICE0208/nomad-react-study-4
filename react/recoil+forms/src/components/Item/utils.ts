import { ItemType } from ".";

/** 특정 타입의 아이템의 첫 번째 버튼에 들어가는 공통 텍스트를 반환합니다. */
export const getFirstBtnText = (type: ItemType) => {
  switch (type) {
    case ItemType.가고싶은:
      return "✅";
    case ItemType.가본:
      return "👍🏻";
    case ItemType.좋아하는:
      return "👎🏻";
    default:
      console.error("Error on getFirstBtnText");
      return "⛔️";
  }
};

/** 특정 타입의 아이템의 두 번째 버튼에 들어가는 공통 텍스트를 반환합니다. */
export const getSecondBtnText = (type: ItemType) => {
  switch (type) {
    case ItemType.가고싶은:
      return "🗑️";
    case ItemType.가본:
      return "❌";
    case ItemType.좋아하는:
      console.error("'좋아하는' 타입의 두번째 버튼은 존재하지 않습니다.");
      return "⛔️";
    default:
      console.error("Error on getSecondBtnText");
      return "⛔️";
  }
};
