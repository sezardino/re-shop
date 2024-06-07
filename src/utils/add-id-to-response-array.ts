import { getIdFromString } from "./get-id-from-string";

// This function adds an id to each item in the array based on the item's name
// If there are duplicate ids, a unique id is created by appending the index to the id
export const addIdToResponseArray = <T extends { name: string }>(data: T[]) => {
  const itemsWithIds = data.map((product) => ({
    ...product,
    id: getIdFromString(product.name),
  }));

  const itemsWithUniqueIds = itemsWithIds.map((item, index) => {
    const isDuplicate = itemsWithIds.some(
      (otherItem, otherIndex) =>
        otherItem.id === item.id && otherIndex !== index
    );

    return isDuplicate ? { ...item, id: `${item.id}-${index}` } : item;
  });

  return itemsWithUniqueIds;
};
