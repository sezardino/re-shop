import { Typography } from "@/components/base/Typography/Typography";
import { HomeGridLayout } from "@/components/templates/Home/HomeTemplate";
import { Product } from "@/schemas";
import { cn, Skeleton } from "@nextui-org/react";
import { ComponentPropsWithRef, FC, Fragment } from "react";
import { ProductGridCard } from "./ProductGridCard";
import { ProductListCard } from "./ProductListCard";

type Props = {
  layout: HomeGridLayout;
  isItemsLoading: boolean;
  products: (Product & { id: string; quantity: number })[];
  search: string;
  onSelectProductToAddToInventory: (productId: string) => void;
};

type InventoryListProps = ComponentPropsWithRef<"ul"> & Props;

export const InventoryList: FC<InventoryListProps> = (props) => {
  const {
    layout,
    isItemsLoading,
    products,
    search,
    onSelectProductToAddToInventory,
    className,
    ...rest
  } = props;
  console.log({ layout });

  if (!isItemsLoading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-80">
        <Typography isMuted>
          {search.length > 0 ? (
            <>
              No products found for search term &lsquo;
              <strong>{search}</strong>&lsquo;
            </>
          ) : (
            "No products found"
          )}
        </Typography>
      </div>
    );
  }

  return (
    <ul
      {...rest}
      className={cn(
        "grid",
        layout === "list"
          ? "grid-cols-1 gap-1"
          : "gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      )}
    >
      {isItemsLoading &&
        new Array(12)
          .fill(null)
          .map((_, index) => (
            <Skeleton
              key={index}
              className={cn("rounded-sm", layout === "list" ? "h-10" : "h-80")}
            />
          ))}
      {!isItemsLoading &&
        products.map((product) => (
          <Fragment key={product.id}>
            {layout === "list" && (
              <ProductListCard
                name={product.name}
                quantity={product.quantity}
                onAddClick={() => onSelectProductToAddToInventory(product.id)}
              />
            )}
            {layout === "grid" && (
              <ProductGridCard
                name={product.name}
                quantity={product.quantity}
                onAddClick={() => onSelectProductToAddToInventory(product.id)}
              />
            )}
          </Fragment>
        ))}
    </ul>
  );
};
