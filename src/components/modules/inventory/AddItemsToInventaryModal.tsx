import {
  ModalWithDescription,
  ModalWithDescriptionProps,
} from "@/components/UI/ModalWithDescription";
import {
  AddItemsToInventoryForm,
  AddItemsToInventoryFormProps,
} from "@/components/forms/AddItemsToInventory/AddItemsToInventoryForm";
import { Product } from "@/schemas";
import { type FC } from "react";

type Props = {
  product: Product;
};

type PickedFormProps = Pick<
  AddItemsToInventoryFormProps,
  "onFormSubmit" | "currentInventoryCount"
>;
type OmittedModalProps = Omit<
  ModalWithDescriptionProps,
  "children" | "title" | "description"
>;

export type AddItemsToInventoryModal = PickedFormProps &
  OmittedModalProps &
  Props;

export const AddItemsToInventoryModal: FC<AddItemsToInventoryModal> = (
  props
) => {
  const { onClose, product, currentInventoryCount, onFormSubmit, ...rest } =
    props;

  const title = `How many "${product.name}" do you wont to add to inventory`;

  return (
    <ModalWithDescription
      {...rest}
      title={title}
      description="Please specify the number of items you would like to add to inventory"
      size="2xl"
      onClose={onClose}
    >
      <AddItemsToInventoryForm
        currentInventoryCount={currentInventoryCount}
        onFormSubmit={onFormSubmit}
        onCancelClick={onClose}
        aria-label={title}
      />
    </ModalWithDescription>
  );
};
