import { HomeTemplate } from "@/components/templates/Home/HomeTemplate";
import {
  useAddItemToInventoryMutation,
  useResetInventoryMutation,
} from "@/hooks";
import { useProductsList } from "@/hooks/use-products-list";

const HomePage = () => {
  // TODO: add error handling
  const { inventoryError, isItemsLoading, products, productsError } =
    useProductsList();

  const { mutateAsync: addProduct, isPending: isAddProductLoading } =
    useAddItemToInventoryMutation();

  const { mutateAsync: resetInventory, isPending: isResetInventoryLoading } =
    useResetInventoryMutation();

  return (
    <HomeTemplate
      isItemsLoading={isItemsLoading}
      products={products}
      onAddItemToInventory={addProduct}
      onResetInventory={() => resetInventory({})}
    />
  );
};

export default HomePage;
