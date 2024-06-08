import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import {
  Card,
  CardFooter,
  CardHeader,
  CardProps,
  Tooltip,
  cn,
} from "@nextui-org/react";
import { FC } from "react";

type Props = {
  name: string;
  quantity: number;
  onAddClick: () => void;
};

export type ProductListCardProps = CardProps & Props;

export const ProductListCard: FC<ProductListCardProps> = (props) => {
  const { name, quantity, onAddClick, className, ...rest } = props;

  return (
    <Card
      {...rest}
      radius="none"
      className={cn("grid grid-cols-[1fr,auto]", className)}
    >
      <CardHeader className="py-1 shrink grow">
        <Typography level="h3">{name}</Typography>
      </CardHeader>
      <CardFooter className="py-1 flex items-center justify-between gap-2">
        <Typography level="p" styling="small">
          {quantity} items in inventory
        </Typography>
        <Tooltip content="Add items to inventory">
          <button
            type="button"
            className="p-1 rounded-full bg-secondary-200"
            onClick={onAddClick}
          >
            <Icon name="FiPlus" size={12} />
          </button>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};
