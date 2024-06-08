import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const MIN_ITEMS_QUANTITY_TO_ADD_TO_INVENTORY = 1;
export const MAX_ITEMS_QUANTITY_TO_ADD_TO_INVENTORY = 1000;

export const ADD_ITEMS_TO_INVENTORY_SLIDER_MARKS = [
  MIN_ITEMS_QUANTITY_TO_ADD_TO_INVENTORY,
  MAX_ITEMS_QUANTITY_TO_ADD_TO_INVENTORY,
].map((value) => ({
  label: value.toString(),
  value,
}));

export const addItemsToInventoryFormValidationSchema = toFormikValidationSchema(
  z.object({
    quantity: z
      .number()
      .min(
        MIN_ITEMS_QUANTITY_TO_ADD_TO_INVENTORY,
        `Quantity must be at least ${MIN_ITEMS_QUANTITY_TO_ADD_TO_INVENTORY}`
      )
      .max(
        MAX_ITEMS_QUANTITY_TO_ADD_TO_INVENTORY,
        `Quantity must be at most ${MAX_ITEMS_QUANTITY_TO_ADD_TO_INVENTORY}`
      ),
  })
);
