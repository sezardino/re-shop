import { HomeTemplate } from "@/components/templates/Home/HomeTemplate";
import { useAllProductsQuery, useInventoryQuery } from "@/hooks";
import { useMemo } from "react";

const HomePage = () => {
  const { data: inventory, isFetching: isInventoryLoading } =
    useInventoryQuery();
  const { data: products, isFetching: isProductsLoading } =
    useAllProductsQuery();

  const reducedProducts = useMemo(() => {
    console.log(inventory, products);
    if (!products || !inventory) return [];

    const matchedProducts = products?.map((product) => {
      const count: number =
        inventory?.find((item) => item.id === product.id)?.quantity || 0;

      return { ...product, count };
    });

    return matchedProducts;
  }, [inventory, products]);

  const isItemsLoading = isInventoryLoading || isProductsLoading;

  return (
    <HomeTemplate isItemsLoading={isItemsLoading} products={reducedProducts} />
  );
};

export default HomePage;
