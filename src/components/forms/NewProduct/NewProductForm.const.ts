import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

export const newProductFormValidationSchema = toFormikValidationSchema(
  z.object({
    name: z.string({ required_error: "Name is required" }),
  })
);

export const newProductFormInitialValues = {
  name: "",
};
