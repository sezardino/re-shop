import { ConfirmModal } from "@/components/UI/ConfirmModal";
import {
  ModalWithDescription,
  ModalWithDescriptionProps,
} from "@/components/UI/ModalWithDescription";
import { Typography } from "@/components/base/Typography/Typography";
import {
  AddMultipleItemsToInventoryForm,
  AddMultipleItemsToInventoryFormValues,
} from "@/components/forms/AddMultipleItemsToInventory/AddMultipleItemsToInventoryForm";
import { useProductsList } from "@/hooks/use-products-list";
import { confettiCannon } from "@/libs";
import { Button, Skeleton } from "@nextui-org/react";
import { useState, type FC } from "react";

type Props = {};

type OmittedModalProps = Omit<
  ModalWithDescriptionProps,
  "children" | "title" | "description"
>;

export type AddMultipleItemsToInventoryWrapper = OmittedModalProps & Props;

export const AddMultipleItemsToInventoryWrapper: FC<
  AddMultipleItemsToInventoryWrapper
> = (props) => {
  const { isOpen, onClose, ...rest } = props;

  const { products, isItemsLoading } = useProductsList(isOpen);

  const [step, setStep] = useState<"form" | "preview" | "success">("form");
  const [previewData, setPreviewData] =
    useState<AddMultipleItemsToInventoryFormValues | null>(null);

  const title = `Select items which you want to add to inventory`;

  const submitFormHandler = (values: AddMultipleItemsToInventoryFormValues) => {
    setPreviewData(values);
    setStep("preview");
  };

  const confirmHandler = async () => {
    if (!previewData) return;

    try {
      // TODO: add mutation

      setStep("success");
      setPreviewData(null);
      confettiCannon();
    } catch (error) {}
  };

  const closeHandler = () => {
    setStep("form");
    setPreviewData(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <ModalWithDescription
        {...rest}
        isOpen={step === "form"}
        title={title}
        placement="top"
        description="Please specify the number of items you would like to add to inventory"
        size="2xl"
        onClose={closeHandler}
      >
        {isItemsLoading && <Skeleton className="h-80" />}
        {!isItemsLoading && (
          <AddMultipleItemsToInventoryForm
            products={products}
            onFormSubmit={submitFormHandler}
            onCancelClick={onClose}
            aria-label={title}
          />
        )}
      </ModalWithDescription>

      <ModalWithDescription
        {...rest}
        isOpen={step === "preview"}
        title="Preview"
        placement="center"
        description="Please review the items you are about to add to inventory"
        size="2xl"
        onClose={closeHandler}
      >
        <ul className="mt-5">
          {previewData?.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between py-1 border-b"
            >
              <div className="flex items-center gap-2">
                <Typography level="p" weight="medium">
                  {item.name}
                </Typography>
                <Typography level="span" styling="xs" isMuted>
                  (
                  {products.find((product) => product.id === item.id)?.quantity}{" "}
                  in inventory)
                </Typography>
              </div>
              <Typography level="span" styling="small" isMuted>
                x{item.quantity}
              </Typography>
            </li>
          ))}
        </ul>
        <footer className="grid grid-cols-1 gap-10 pb-5">
          <Typography level="span" styling="small" isMuted className="ml-auto">
            Total items to add:{" "}
            {previewData?.items.reduce((acc, item) => acc + item.quantity, 0)}
          </Typography>

          <div className="flex items-center flex-wrap gap-3 justify-between">
            <Button variant="bordered" onClick={() => setStep("form")}>
              Back to form
            </Button>
            <Button color="primary" onClick={confirmHandler}>
              Add items
            </Button>
          </div>
        </footer>
      </ModalWithDescription>

      <ConfirmModal
        {...rest}
        isOpen={step === "success"}
        title="Success!"
        description="Items have been successfully added to inventory"
        placement="center"
        buttons={[
          {
            children: "Close",
            color: "primary",
            onClick: closeHandler,
          },
        ]}
        onClose={closeHandler}
      />
    </>
  );
};
