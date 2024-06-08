import { ConfirmModal } from "@/components/UI/ConfirmModal";
import { DropdownActions } from "@/components/UI/DropdownMenu";
import { SearchForm } from "@/components/UI/SearchForm";
import { Icon, IconNames } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { AddItemsToInventoryFormValues } from "@/components/forms/AddItemsToInventory/AddItemsToInventoryForm";
import { AddItemsToInventoryModal } from "@/components/modules/inventory/AddItemsToInventaryModal";
import { InventoryList } from "@/components/modules/inventory/InventoryList";
import { AddMultipleItemsToInventoryWrapper } from "@/components/wrapers/AddMultipleProducts/AddMultipleProductsWrapper";
import { ProjectUrls } from "@/const";
import { useProjectStorageField } from "@/hooks";
import { Product } from "@/schemas";
import { AddItemToInventoryRequest } from "@/services";
import { Button, Switch, Tab, Tabs } from "@nextui-org/react";
import Link from "next/link";
import { FC, useMemo, useState } from "react";

export type HomeTemplateProps = {
  products?: (Product & { id: string; quantity: number })[];
  isItemsLoading: boolean;
  onAddItemToInventory: (values: AddItemToInventoryRequest) => Promise<any>;
  onResetInventory: () => Promise<any>;
};

export type HomeGridLayout = "list" | "grid";

const gridLayouts: { label: string; id: HomeGridLayout; icon: IconNames }[] = [
  { label: "List", id: "list", icon: "FiList" },
  { label: "Cards", id: "grid", icon: "FiGrid" },
];

export const HomeTemplate: FC<HomeTemplateProps> = (props) => {
  const { isItemsLoading, products, onAddItemToInventory, onResetInventory } =
    props;
  const [itemToAddId, setItemToAddId] = useState<string | null>(null);
  const [gridLayout, setGridLayout] = useProjectStorageField("homeGrid");
  const [search, setSearch] = useState("");
  const [showProductsInInventory, setShowProductsInInventory] = useState(false);
  const [isMultipleModalOpen, setIsMultipleModalOpen] = useState(false);
  const [isResetInventoryModalOpen, setIsResetInventoryModalOpen] =
    useState(false);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) => {
      const isSearchMatch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const isInInventory = product.quantity > 0;

      return showProductsInInventory
        ? isInInventory && isSearchMatch
        : isSearchMatch;
    });
  }, [products, search, showProductsInInventory]);

  const itemToAddToInventory = useMemo(() => {
    if (!itemToAddId) return null;

    const itemToAdd = products?.find((product) => product.id === itemToAddId);

    if (!itemToAdd) return null;

    return itemToAdd;
  }, [itemToAddId, products]);

  const addItemsHandler = async (values: AddItemsToInventoryFormValues) => {
    if (!itemToAddToInventory) return;

    try {
      await onAddItemToInventory({
        name: itemToAddToInventory.name,
        quantity: values.quantity,
      });

      setItemToAddId(null);
    } catch (error) {}
  };

  const resetInventoryHandler = async () => {
    try {
      await onResetInventory();
      setIsResetInventoryModalOpen(false);
    } catch (error) {}
  };

  return (
    <>
      <main className="container mx-auto grid grid-cols-1 gap-10 py-20">
        <header className="flex items-center gap-3 flex-wrap justify-between">
          <Typography level="h1" styling="h2">
            Inventory
          </Typography>

          <Button as={Link} color="primary" href={ProjectUrls.newProduct}>
            Create new product
          </Button>
        </header>

        <section className="grid grid-cols-1 gap-4">
          <header className="grid grid-cols-1 gap-2">
            <DropdownActions
              triggerProps={{
                variant: "bordered",
                color: "secondary",
              }}
              items={[
                {
                  children: "Add multiple items to inventory",
                  onClick: () => setIsMultipleModalOpen(true),
                },
                {
                  children: "Reset inventory",
                  onClick: () => setIsResetInventoryModalOpen(true),
                },
              ]}
              className="justify-self-end"
            />

            <div className="flex items-center justify-between gap-3 flex-wrap">
              <SearchForm
                size="md"
                placeholder="Search by name"
                className="max-w-80"
                onSearch={setSearch}
              />

              <div className="flex items-center gap-2">
                <Switch
                  isSelected={showProductsInInventory}
                  onValueChange={setShowProductsInInventory}
                  classNames={{
                    label: "-order-1 mr-2",
                    wrapper: "mr-0",
                  }}
                >
                  Show products in inventory
                </Switch>
                <Tabs
                  selectedKey={gridLayout}
                  onSelectionChange={(key) =>
                    setGridLayout(key as HomeGridLayout)
                  }
                  aria-label="Grid layout"
                >
                  {gridLayouts.map(({ icon, id, label }) => (
                    <Tab
                      key={id}
                      textValue={label}
                      title={
                        <div className="flex items-center gap-1">
                          <Typography level="span">{label}</Typography>
                          <Icon name={icon} size={16} className="-order-1" />
                        </div>
                      }
                    />
                  ))}
                </Tabs>
              </div>
            </div>
          </header>

          <InventoryList
            layout={gridLayout}
            isItemsLoading={isItemsLoading}
            products={filteredProducts}
            search={search}
            onSelectProductToAddToInventory={setItemToAddId}
          />
        </section>
      </main>

      {itemToAddToInventory && (
        <AddItemsToInventoryModal
          isOpen={!!itemToAddToInventory}
          onClose={() => setItemToAddId(null)}
          product={itemToAddToInventory}
          currentInventoryQuantity={itemToAddToInventory.quantity}
          onFormSubmit={addItemsHandler}
        />
      )}

      <AddMultipleItemsToInventoryWrapper
        isOpen={isMultipleModalOpen}
        onClose={() => setIsMultipleModalOpen(false)}
      />

      <ConfirmModal
        isOpen={isResetInventoryModalOpen}
        onClose={() => setIsResetInventoryModalOpen(false)}
        title="Reset inventory"
        description="Are you sure that you wont to reset your inventory"
        buttons={[
          {
            children: "Cancel",
            variant: "bordered",
            onClick: () => setIsResetInventoryModalOpen(false),
          },
          {
            children: "Reset inventory",
            color: "danger",
            onClick: resetInventoryHandler,
          },
        ]}
      />
    </>
  );
};
