import { HomeTemplate } from "@/components/templates/Home/HomeTemplate";
import { useProductsList } from "@/hooks/use-products-list";

const HomePage = () => {
  // TODO: add error handling
  const { inventoryError, isItemsLoading, products, productsError } =
    useProductsList();

  return <HomeTemplate isItemsLoading={isItemsLoading} products={products} />;
};

export default HomePage;
