import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const addMultipleItemsToInventoryFormValidationSchema =
  toFormikValidationSchema(
    z.object({
      items: z
        .array(
          z.object({
            accordionId: z.string(),
            id: z.string({ required_error: "Please select a product" }),
            quantity: z.number().min(1),
          })
        )
        .min(1, ""),
    })
  );

export const addMultipleItemsToInventoryFormInitialValues = {
  items: [],
};
