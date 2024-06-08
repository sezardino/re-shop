import { Typography } from "@/components/base/Typography/Typography";
import { Button, cn } from "@nextui-org/react";
import { ComponentPropsWithoutRef, FC } from "react";

type Props = {
  onCancelClick: () => void;
  reset: string;
  submit: string;
};

export type FormFooterProps = ComponentPropsWithoutRef<"footer"> & Props;

export const FormFooter: FC<FormFooterProps> = (props) => {
  const { reset, submit, onCancelClick, className, ...rest } = props;

  return (
    <footer
      className={cn(
        "flex items-center gap-3 justify-between flex-wrap",
        className
      )}
    >
      <Button type="reset" variant="bordered" onClick={onCancelClick}>
        <Typography level="span">{reset}</Typography>
      </Button>
      <Button type="submit" color="primary">
        <Typography level="span">{submit}</Typography>
      </Button>
    </footer>
  );
};
