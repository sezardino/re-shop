import { LoadingOverlay } from "@/components/UI/LoadingOverlay";
import { HomeTemplate } from "@/components/templates/Home/HomeTemplate";
import {
  useAddItemToInventoryMutation,
  useResetInventoryMutation,
} from "@/hooks";
import { useProductsList } from "@/hooks/use-products-list";
import Error from "next/error";

const HomePage = () => {
  const { inventoryError, isItemsLoading, products, productsError } =
    useProductsList();

  const { mutateAsync: addProduct, isPending: isAddProductLoading } =
    useAddItemToInventoryMutation();

  const { mutateAsync: resetInventory, isPending: isResetInventoryLoading } =
    useResetInventoryMutation();

  if (!isItemsLoading && (inventoryError || productsError))
    return <Error statusCode={500} title="Something went wrong..." />;

  const isLoading = isAddProductLoading || isResetInventoryLoading;

  return (
    <>
      {isLoading && <LoadingOverlay />}

      <HomeTemplate
        isItemsLoading={isItemsLoading}
        products={products}
        onAddItemToInventory={addProduct}
        onResetInventory={() => resetInventory({})}
      />
    </>
  );
};

export default HomePage;
