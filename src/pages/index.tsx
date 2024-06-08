import { HomeTemplate } from "@/components/templates/Home/HomeTemplate";
import { useAddItemToInventoryMutation } from "@/hooks";
import { useProductsList } from "@/hooks/use-products-list";

const HomePage = () => {
  // TODO: add error handling
  const { inventoryError, isItemsLoading, products, productsError } =
    useProductsList();

  const { mutateAsync: addProduct, isPending } =
    useAddItemToInventoryMutation();

  return (
    <HomeTemplate
      isItemsLoading={isItemsLoading}
      products={products}
      onAddItemToInventory={addProduct}
    />
  );
};

export default HomePage;
