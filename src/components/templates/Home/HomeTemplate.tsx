import { SearchForm } from "@/components/UI/SearchForm";
import { Icon, IconNames } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { AddItemsToInventoryModal } from "@/components/modules/inventory/AddItemsToInventaryModal";
import { AddMultipleItemsToInventoryModal } from "@/components/modules/inventory/AddMultipleItemsToInventaryModal";
import { ProductGridCard } from "@/components/modules/inventory/ProductGridCard";
import { ProductListCard } from "@/components/modules/inventory/ProductListCard";
import { Product } from "@/schemas";
import { Tab, Tabs, cn } from "@nextui-org/react";
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

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const itemToAddToInventory = useMemo(() => {
    if (!itemToAddId) return null;

    const itemToAdd = products?.find((product) => product.id === itemToAddId);

    if (!itemToAdd) return null;

    return itemToAdd;
  }, [itemToAddId, products]);

  return (
    <>
      <main className="container mx-auto grid grid-cols-1 gap-10">
        <Typography level="h1" styling="h2">
          Inventory
        </Typography>

        <section className="grid grid-cols-1 gap-4">
          <header className="flex items-center justify-between gap-3 flex-wrap">
            <SearchForm onSearch={setSearch} className="max-w-80" />

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
          isOpen
          onClose={() => {}}
          products={products}
        />
      )}
    </>
  );
};
