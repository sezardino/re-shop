import { ButtonWithTooltip } from "@/components/UI/ButtonWithTooltip";
import { Icon } from "@/components/base/Icon/Icon";
import { Typography } from "@/components/base/Typography/Typography";
import { FormikAutocomplete } from "@/components/formik/Autocomplete";
import { FormikInput } from "@/components/formik/Input";
import { FormFooter } from "@/components/modules/shared/FormFooter";
import { Product } from "@/schemas";
import {
  Accordion,
  AccordionItem,
  AutocompleteItem,
  Chip,
  cn,
} from "@nextui-org/react";
import { FieldArray, Form, FormikProvider, useFormik } from "formik";
import { useState, type ComponentPropsWithoutRef, type FC } from "react";
import {
  addMultipleItemsToInventoryFormInitialValues,
  addMultipleItemsToInventoryFormValidationSchema,
} from "./AddMultipleItemsToInventoryForm.const";

export type AddMultipleItemsToInventoryFormValues = {
  items: {
    accordionId: string;
    id: string;
    name: string;
    quantity: number;
  }[];
};

type Props = {
  onFormSubmit: (values: AddMultipleItemsToInventoryFormValues) => void;
  products: (Product & { id: string; quantity: number })[];
  onCancelClick: () => void;
};

export type AddMultipleItemsToInventoryFormProps =
  ComponentPropsWithoutRef<"form"> & Props;

export const AddMultipleItemsToInventoryForm: FC<
  AddMultipleItemsToInventoryFormProps
> = (props) => {
  const { products, onFormSubmit, onCancelClick, className, ...rest } = props;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const formik = useFormik<AddMultipleItemsToInventoryFormValues>({
    initialValues: addMultipleItemsToInventoryFormInitialValues,
    validationSchema: addMultipleItemsToInventoryFormValidationSchema,
    onSubmit: onFormSubmit,
  });

  const selectProductHandler = (key: string, index: number) => {
    const product = products.find((product) => product.id === key);
    const formikProduct = formik.values.items[index];
    if (!product || !formikProduct) return;

    formik.setFieldValue(`items[${index}]`, {
      ...formikProduct,
      name: product.name,
      id: key,
    });
  };

  const addProductHandler = () => {
    const accordionId = crypto.randomUUID();

    formik.setFieldValue("items", [
      ...formik.values.items,
      { quantity: 1, name: "", id: "", accordionId },
    ]);
    setSelectedKeys([accordionId]);
  };

  return (
    <FormikProvider value={formik}>
      <Form {...rest} className={cn("py-6 grid grid-cols-1 gap-10", className)}>
        <div className="grid grid-cols-1 gap-4">
          {!!formik.values.items.length && (
            <FieldArray
              name="items"
              render={(arrayHelper) => (
                <Accordion
                  as="ul"
                  selectionMode="multiple"
                  variant="shadow"
                  selectedKeys={selectedKeys}
                  onSelectionChange={(keys) =>
                    setSelectedKeys(Array.from(keys as Set<string>))
                  }
                  items={formik.values.items.map((item) => item.accordionId)}
                >
                  {formik.values.items.map((item, index) => {
                    return (
                      <AccordionItem
                        key={item.accordionId}
                        disableAnimation
                        className="grid grid-cols-1 gap-2"
                        textValue={item.name || `Product ${index + 1}`}
                        title={
                          <div className="flex items-center justify-between">
                            <Typography level="h3">
                              {item.name ? item.name : `Product ${index + 1}`}
                            </Typography>
                            <div className="flex items-center gap-2">
                              <Chip size="sm">
                                <Typography styling="small" level="span">
                                  {item.quantity}
                                </Typography>
                              </Chip>
                              <ButtonWithTooltip
                                tooltipProps={{ color: "danger" }}
                                variant="bordered"
                                color="danger"
                                radius="full"
                                size="sm"
                                isIconOnly
                                content="Delete product"
                                onClick={() => arrayHelper.remove(index)}
                              >
                                <Icon name="TbTrashX" size={18} />
                              </ButtonWithTooltip>
                            </div>
                          </div>
                        }
                      >
                        <div className="pb-4 grid md:grid-cols-2 gap-3">
                          <FormikAutocomplete
                            key={formik.values.items[index].id}
                            name={`items[${index}].id`}
                            defaultItems={products.filter((product) =>
                              product.id === formik.values.items[index].id
                                ? true
                                : formik.values.items.every(
                                    (item) => item.id !== product.id
                                  )
                            )}
                            isClearable={false}
                            label="Product"
                            placeholder="Search by name"
                            labelPlacement="outside"
                            onAfterChange={(key) =>
                              selectProductHandler(key, index)
                            }
                          >
                            {(product) => (
                              <AutocompleteItem
                                key={product.id}
                                textValue={product.name}
                              >
                                <div className="grid grid-cols-1">
                                  <Typography level="span" styling="small">
                                    {product.name}
                                  </Typography>
                                  <Typography
                                    level="span"
                                    styling="xxs"
                                    isMuted
                                  >
                                    {product.quantity} in inventory
                                  </Typography>
                                </div>
                              </AutocompleteItem>
                            )}
                          </FormikAutocomplete>
                          <FormikInput
                            name={`items[${index}].quantity`}
                            labelPlacement="outside"
                            type="number"
                            label="Quantity"
                            placeholder="Enter quantity"
                          />
                        </div>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              )}
            />
          )}

          {formik.values.items.length === 0 && (
            <Typography
              level="p"
              isMuted
              styling="small"
              className={cn(
                "text-center",
                typeof formik.errors.items === "string"
                  ? "text-danger"
                  : undefined
              )}
            >
              No products added yet
            </Typography>
          )}
          <ButtonWithTooltip
            tooltipProps={{ color: "primary" }}
            variant="bordered"
            color="primary"
            radius="full"
            size="sm"
            isIconOnly
            className="mx-auto"
            content="Add product"
            disabledContent="Please add a product first"
            isDisabled={!!formik.errors.items?.length}
            onClick={addProductHandler}
          >
            <Icon name="FiPlus" size={18} />
          </ButtonWithTooltip>
        </div>

        <FormFooter
          onCancelClick={onCancelClick}
          submit="Add product to inventory"
          reset="Cancel"
        />
      </Form>
    </FormikProvider>
  );
};
