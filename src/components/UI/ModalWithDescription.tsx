import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";
import { type FC } from "react";

import { Typography } from "../base/Typography/Typography";

type Props = {
  title: string;
  description?: string;
  onClose: () => void;
};

export type ModalWithDescriptionProps = ModalProps & Props;

export const ModalWithDescription: FC<ModalWithDescriptionProps> = (props) => {
  const { title, description, children, className, ...rest } = props;

  return (
    <Modal {...rest}>
      <ModalContent>
        <ModalHeader className="grid grid-cols-1 gap-2">
          <Typography level="h2" styling="h4">
            {title}
          </Typography>

          {description && (
            <Typography styling="small" isMuted>
              {description}
            </Typography>
          )}
        </ModalHeader>

        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
