import {
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownItemProps,
  DropdownMenu,
  DropdownProps,
  DropdownTrigger,
} from "@nextui-org/react";
import { FC } from "react";
import { Typography } from "../base/Typography/Typography";

type Props = {
  triggerProps: ButtonProps;
  items: DropdownItemProps[];
};

type OmittedDropdownProps = Omit<DropdownProps, "children">;

export type DropdownMenuProps = OmittedDropdownProps & Props;

export const DropdownActions: FC<DropdownMenuProps> = (props) => {
  const { triggerProps, items, className, ...rest } = props;

  return (
    <Dropdown {...rest}>
      <DropdownTrigger>
        <Button {...triggerProps} className={className}>
          <Typography level="span">Actions</Typography>
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        {items.map((item, index) => (
          <DropdownItem key={index} {...item} />
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
