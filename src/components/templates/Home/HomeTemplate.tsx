import { SearchForm } from "@/components/UI/SearchForm";
import { Icon, IconNames } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { AddItemsToInventoryModal } from "@/components/modules/inventory/AddItemsToInventaryModal";
import { AddMultipleItemsToInventoryModal } from "@/components/modules/inventory/AddMultipleItemsToInventaryModal";
import { ProductGridCard } from "@/components/modules/inventory/ProductGridCard";
import { ProductListCard } from "@/components/modules/inventory/ProductListCard";
import { ProjectUrls } from "@/const";
import { Product } from "@/schemas";
import { Button, Switch, Tab, Tabs, cn } from "@nextui-org/react";
import Link from "next/link";
import { FC, Fragment, useMemo, useState } from "react";

export type HomeTemplateProps = {
  products?: (Product & { id: string; quantity: number })[];
  isItemsLoading: boolean;
};

type GridLayout = "list" | "grid";

const gridLayouts: { label: string; id: GridLayout; icon: IconNames }[] = [
  { label: "List", id: "list", icon: "FiList" },
  { label: "Cards", id: "grid", icon: "FiGrid" },
];

export const HomeTemplate: FC<HomeTemplateProps> = (props) => {
  const { isItemsLoading, products } = props;
  const [itemToAddId, setItemToAddId] = useState<string | null>(null);
  const [gridLayout, setGridLayout] = useState<GridLayout>("list");
  const [search, setSearch] = useState("");
  const [showProductsInInventory, setShowProductsInInventory] = useState(false);
  const [isMultipleModalOpen, setIsMultipleModalOpen] = useState(false);

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

  return (
    <>
      <main className="container mx-auto grid grid-cols-1 gap-10 py-20">
        <header className="flex items-center gap-3 flex-wrap justify-between">
          <Typography level="h1" styling="h2">
            Inventory
          </Typography>

          <div className="flex items-center gap-3">
            <Button as={Link} color="primary" href={ProjectUrls.newProduct}>
              Create new product
            </Button>
            <Button
              color="primary"
              onClick={() => setIsMultipleModalOpen(true)}
            >
              Add multiple items
            </Button>
          </div>
        </header>

        <section className="grid grid-cols-1 gap-4">
          <header className="flex items-center justify-between gap-3 flex-wrap">
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
                onSelectionChange={(key) => setGridLayout(key as GridLayout)}
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
          </header>
          <ul
            className={cn(
              "grid",
              gridLayout === "list"
                ? "grid-cols-1 gap-1"
                : "gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            )}
          >
            {filteredProducts.map((product) => (
              <Fragment key={product.id}>
                {gridLayout === "list" && (
                  <ProductListCard
                    name={product.name}
                    quantity={product.quantity}
                    onAddClick={() => setItemToAddId(product.id)}
                  />
                )}
                {gridLayout === "grid" && (
                  <ProductGridCard
                    name={product.name}
                    quantity={product.quantity}
                    onAddClick={() => setItemToAddId(product.id)}
                  />
                )}
              </Fragment>
            ))}
          </ul>
        </section>
      </main>

      {itemToAddToInventory && (
        <AddItemsToInventoryModal
          isOpen={!!itemToAddToInventory}
          onClose={() => setItemToAddId(null)}
          product={itemToAddToInventory}
          currentInventoryCount={itemToAddToInventory.quantity}
          onFormSubmit={() => undefined}
        />
      )}

      {!!products?.length && (
        <AddMultipleItemsToInventoryModal
          isOpen={isMultipleModalOpen}
          onFormSubmit={() => undefined}
          onClose={() => setIsMultipleModalOpen(false)}
          products={products}
        />
      )}
    </>
  );
};
