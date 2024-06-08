import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
  cn,
} from "@nextui-org/react";
import { Fragment, type FC } from "react";

import { Typography } from "@/components/base/Typography/Typography";

import { Icon, IconNames } from "../base/Icon/Icon";

type Props = {
  title: string;
  description?: string;
  buttons: Omit<ButtonProps, "size">[];
  isTextCentered?: boolean;
  icon?: IconNames;
  children?: React.ReactNode;
};

type OmittedModalProps = Omit<ModalProps, "children">;

export type ConfirmModalProps = OmittedModalProps & Props;

export const ConfirmModal: FC<ConfirmModalProps> = (props) => {
  const {
    title,
    description,
    isTextCentered = false,
    buttons,
    size = "md",
    icon,
    children,
    ...rest
  } = props;

  return (
    <Modal {...rest} size={size}>
      <ModalContent>
        <ModalHeader
          className={cn(
            "grid grid-cols-1 gap-4",
            isTextCentered && "items-center"
          )}
        >
          <div
            className={cn(
              "grid grid-cols-1 gap-1",
              isTextCentered && "text-center"
            )}
          >
            <Typography level="h3" styling="h4">
              {title}
            </Typography>
            {description && (
              <Typography level="p" styling="small" color="neutral-500">
                {description}
              </Typography>
            )}
          </div>

          {icon && (
            <Icon
              name={icon}
              className={cn("-order-1", isTextCentered && "mx-auto")}
            />
          )}
        </ModalHeader>

        {children && <ModalBody>{children}</ModalBody>}

        <ModalFooter
          className={cn(
            "flex items-center justify-between gap-2 py-4 flex-wrap",
            buttons.length === 1 && "justify-center"
          )}
        >
          {buttons.map((button, index) => (
            <Fragment key={index}>
              <Button key={index} size="sm" {...button} />
            </Fragment>
          ))}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
