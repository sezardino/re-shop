import { useMemo } from "react";
import { useAllProductsQuery, useInventoryQuery } from "./react-query";

export const useProductsList = (enabled = true) => {
  const {
    data: inventory,
    isFetching: isInventoryLoading,
    error: inventoryError,
  } = useInventoryQuery(enabled);
  const {
    data: products,
    isFetching: isProductsLoading,
    error: productsError,
  } = useAllProductsQuery(enabled);

  const reducedProducts = useMemo(() => {
    if (!products || !inventory) return [];

    const matchedProducts = products?.map((product) => {
      const quantity: number =
        inventory?.find((item) => item.id === product.id)?.quantity || 0;

      return { ...product, quantity };
    });

    return matchedProducts;
  }, [inventory, products]);

  return {
    products: reducedProducts,
    isItemsLoading: isInventoryLoading || isProductsLoading,
    inventoryError,
    productsError,
  };
};
