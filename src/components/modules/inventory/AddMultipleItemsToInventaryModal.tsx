import {
  ModalWithDescription,
  ModalWithDescriptionProps,
} from "@/components/UI/ModalWithDescription";
import {
  AddMultipleItemsToInventoryForm,
  AddMultipleItemsToInventoryFormProps,
} from "@/components/forms/AddMultipleItemsToInventory/AddMultipleItemsToInventoryForm";
import { type FC } from "react";

type Props = {};

type PickedFormProps = Pick<
  AddMultipleItemsToInventoryFormProps,
  "onFormSubmit" | "products"
>;
type OmittedModalProps = Omit<
  ModalWithDescriptionProps,
  "children" | "title" | "description"
>;

export type AddMultipleItemsToInventoryModal = PickedFormProps &
  OmittedModalProps &
  Props;

export const AddMultipleItemsToInventoryModal: FC<
  AddMultipleItemsToInventoryModal
> = (props) => {
  const { onClose, products, onFormSubmit, ...rest } = props;

  const title = `Select items which you want to add to inventory`;

  return (
    <ModalWithDescription
      {...rest}
      title={title}
      placement="top"
      description="Please specify the number of items you would like to add to inventory"
      size="2xl"
      onClose={onClose}
    >
      <AddMultipleItemsToInventoryForm
        products={products}
        onFormSubmit={() => undefined}
        onCancelClick={onClose}
        aria-label={title}
      />
    </ModalWithDescription>
  );
};
