import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import {
  Card,
  CardFooter,
  CardHeader,
  CardProps,
  Image,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import { FC, useState } from "react";

type Props = {
  name: string;
  quantity: number;
  onAddClick: () => void;
};

export type ProductGridCardProps = CardProps & Props;

export const ProductGridCard: FC<ProductGridCardProps> = (props) => {
  const { name, quantity, onAddClick, className, ...rest } = props;
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Card {...rest}>
      <CardHeader className="flex flex-col gap-1 items-start">
        <Typography level="h3" className="order-1">
          {name}
        </Typography>
        <Skeleton isLoaded={isImageLoaded} className="rounded-md">
          <Image
            src="/placeholder.png"
            onLoad={() => setTimeout(() => setIsImageLoaded(true))}
            alt={name}
          />
        </Skeleton>
      </CardHeader>
      <CardFooter className="mt-auto flex items-center justify-between gap-3 flex-wrap">
        <Typography level="p" styling="xs" isMuted>
          {quantity} items in inventory
        </Typography>
        <Tooltip content="Add items to inventory">
          <button
            type="button"
            className="p-1 rounded-full bg-secondary-200"
            onClick={onAddClick}
          >
            <Icon name="FiPlus" size={14} />
          </button>
        </Tooltip>
      </CardFooter>
    </Card>
  );
};
