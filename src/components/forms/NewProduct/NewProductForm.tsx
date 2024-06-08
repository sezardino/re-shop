import { FormikInput } from "@/components/formik/Input";
import { FormFooter } from "@/components/modules/shared/FormFooter";
import { cn } from "@nextui-org/react";
import { Form, FormikProvider, useFormik } from "formik";
import { type ComponentPropsWithoutRef, type FC } from "react";
import {
  newProductFormInitialValues,
  newProductFormValidationSchema,
} from "./NewProductForm.const";

export type NewProductFormValues = {
  name: string;
};

type Props = {
  onFormSubmit: (values: NewProductFormValues) => void;
  onCancelClick: () => void;
};

export type NewProductFormProps = ComponentPropsWithoutRef<"form"> & Props;

export const NewProductForm: FC<NewProductFormProps> = (props) => {
  const { onFormSubmit, onCancelClick, className, ...rest } = props;

  const formik = useFormik<NewProductFormValues>({
    initialValues: newProductFormInitialValues,
    validationSchema: newProductFormValidationSchema,
    onSubmit: onFormSubmit,
  });

  return (
    <FormikProvider value={formik}>
      <Form {...rest} className={cn("py-6 grid grid-cols-1 gap-10", className)}>
        <FormikInput
          name="name"
          labelPlacement="outside"
          label="Product name"
          placeholder="Iphone 15 Pro Max"
        />

        <FormFooter
          onCancelClick={onCancelClick}
          reset="Cancel"
          submit="Add new product"
        />
      </Form>
    </FormikProvider>
  );
};
