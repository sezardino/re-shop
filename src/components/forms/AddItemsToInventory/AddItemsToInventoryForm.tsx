import { Typography } from "@/components/base/Typography/Typography";
import { Button, Slider, cn } from "@nextui-org/react";
import { Form, FormikProvider, useFormik } from "formik";
import { useId, type ComponentPropsWithoutRef, type FC } from "react";
import {
  ADD_ITEMS_TO_INVENTORY_SLIDER_MARKS,
  MAX_ITEMS_QUANTITY_TO_ADD_TO_INVENTORY,
  MIN_ITEMS_QUANTITY_TO_ADD_TO_INVENTORY,
  addItemsToInventoryFormValidationSchema,
} from "./AddItemsToInventoryForm.const";

export type AddItemsToInventoryFormValues = {
  quantity: number;
};

type Props = {
  onFormSubmit: (values: AddItemsToInventoryFormValues) => void;
  currentInventoryQuantity: number;
  onCancelClick: () => void;
};

export type AddItemsToInventoryFormProps = ComponentPropsWithoutRef<"form"> &
  Props;

export const AddItemsToInventoryForm: FC<AddItemsToInventoryFormProps> = (
  props
) => {
  const {
    currentInventoryQuantity,
    onFormSubmit,
    onCancelClick,
    className,
    ...rest
  } = props;
  const sliderId = useId();
  const descriptionId = sliderId + "-description";
  const errorId = sliderId + "-error";

  const formik = useFormik<AddItemsToInventoryFormValues>({
    initialValues: {
      quantity: 1,
    },
    validationSchema: addItemsToInventoryFormValidationSchema,
    onSubmit: onFormSubmit,
  });

  const sliderChangeEndHandler = (value: number | number[]) => {
    if (typeof value !== "number" || !Number.isFinite(value)) return;

    formik.setFieldValue("quantity", value);
  };

  const isQuantityWithError = Boolean(
    formik.touched.quantity && formik.errors.quantity
  );

  return (
    <FormikProvider value={formik}>
      {JSON.stringify(formik.errors)}
      <Form {...rest} className={cn("py-6 grid grid-cols-1 gap-10", className)}>
        <div className="grid grid-cols-1 gap-2">
          <Slider
            id={sliderId}
            label="How many items would you like to add?"
            minValue={MIN_ITEMS_QUANTITY_TO_ADD_TO_INVENTORY}
            maxValue={MAX_ITEMS_QUANTITY_TO_ADD_TO_INVENTORY}
            defaultValue={formik.values.quantity}
            onChangeEnd={sliderChangeEndHandler}
            marks={ADD_ITEMS_TO_INVENTORY_SLIDER_MARKS}
            aria-describedby={descriptionId}
            aria-invalid={isQuantityWithError}
            aria-errormessage={errorId}
          />

          <Typography
            color="neutral-700"
            styling="small"
            id={`${sliderId}-description`}
          >
            Current inventory quantity: <b>{currentInventoryQuantity}</b>
          </Typography>

          {isQuantityWithError && (
            <Typography id={`${sliderId}-error`} className="text-danger-500">
              {formik.errors.quantity}
            </Typography>
          )}
        </div>

        <div className="flex items-center gap-3 justify-between flex-wrap">
          <Button type="reset" variant="bordered" onClick={onCancelClick}>
            <Typography level="span">Cancel</Typography>
          </Button>
          <Button type="submit" color="primary">
            <Typography level="span">Add</Typography>
          </Button>
        </div>
      </Form>
    </FormikProvider>
  );
};
